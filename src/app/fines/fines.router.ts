import invariant from 'tiny-invariant'
import { TRPCError } from '@trpc/server'
import { nanoid } from 'nanoid'
import { z } from 'zod'

import type { Fine, FineLeader, FineList, MostPaidFine } from '@app/fines'
import { ITEMS_PER_PAGE } from '@config/constants'
import { createRouter } from '@server/createRouter'
import { fineTransformer } from '@app/fines/transformers/fine.transformer'
import { hasAdminRole } from '@app/users/helpers/hasAdminRole'
import { pagination } from '@utils/pagination'
import { GetOwnInput, PaginationInput } from '@app/fines/validations'

export const finesRouter = createRouter()
  .query('all', {
    input: PaginationInput,
    async resolve({ ctx, input }): Promise<FineList> {
      const { skip, take } = pagination.getSkipTake({
        page: input.page ?? 0,
        perPage: input.perPage ?? ITEMS_PER_PAGE,
      })

      const [count, fines] = await ctx.prisma.$transaction([
        ctx.prisma.fine.count(),
        ctx.prisma.fine.findMany({
          take: take,
          skip: skip,
          include: {
            owner: true,
          },
          orderBy: [{ paid: 'asc' }, { createdAt: 'desc' }],
        }),
      ])

      return {
        count,
        fines: fines.map(fineTransformer),
      }
    },
  })
  .query('most-paid', {
    async resolve({ ctx }): Promise<MostPaidFine[]> {
      const result = await ctx.prisma.fine.groupBy({
        by: ['title'],
        _count: true,
        _sum: {
          price: true,
        },
        orderBy: {
          _count: {
            ownerId: 'desc',
          },
        },
      })

      return result.map(({ title, _count, _sum }) => ({
        id: nanoid(),
        title,
        paidTimes: _count,
        sum: _sum.price ?? 0,
      }))
    },
  })
  .query('own', {
    input: GetOwnInput,
    async resolve({ ctx, input }): Promise<FineList> {
      const { userId, skip, take } = input

      if (!ctx.user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }

      const [count, fines] = await ctx.prisma.$transaction([
        ctx.prisma.fine.count({
          where: {
            ownerId: userId,
          },
        }),
        ctx.prisma.fine.findMany({
          take: take ?? 10,
          skip: skip ?? undefined,
          where: {
            ownerId: userId,
          },
          include: {
            owner: true,
          },
          orderBy: [{ paid: 'asc' }, { createdAt: 'desc' }],
        }),
      ])

      return {
        fines: fines.map(fineTransformer),
        count,
      }
    },
  })
  .query('own-unpaid', {
    input: GetOwnInput,
    async resolve({ ctx, input }): Promise<FineList> {
      const { userId } = input

      if (!ctx.user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }

      const [count, fines] = await ctx.prisma.$transaction([
        ctx.prisma.fine.count({
          where: {
            ownerId: userId,
            status: 'UNPAID',
          },
        }),
        ctx.prisma.fine.findMany({
          where: {
            ownerId: userId,
            status: 'UNPAID',
          },
          include: {
            owner: true,
          },
          orderBy: [{ paid: 'asc' }, { createdAt: 'desc' }],
        }),
      ])

      return {
        fines: fines.map(fineTransformer),
        count,
      }
    },
  })
  .query('leaders', {
    async resolve({ ctx }): Promise<FineLeader[]> {
      const result = await ctx.prisma.user.findMany({
        include: {
          fines: {
            select: {
              price: true,
            },
          },
          _count: {
            select: {
              fines: true,
            },
          },
        },
      })

      const transformed: FineLeader[] = result.map(
        ({ _count, fines, id, image, name }) => ({
          id,
          name: name ?? 'No name',
          totalPaid: fines.reduce((total, fine) => total + fine.price, 0),
          totalFines: _count.fines,
          avatar: image,
        })
      )

      const sortedByTotalPaid = transformed.sort(
        (a, b) => b.totalPaid - a.totalPaid
      )

      return sortedByTotalPaid.slice(0, 6)
    },
  })
  .mutation('create', {
    input: z.object({
      fineTypeId: z.string(),
      ownerId: z.string(),
    }),
    async resolve({ ctx, input }): Promise<Fine> {
      const isAdmin = ctx.user && hasAdminRole(ctx.user)

      // Throw error if the user is not an admin
      if (!isAdmin) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Admin privileges is required',
        })
      }

      /**
       * Find already created fine type, as we want to base our fines
       * on a list of already made fine types
       */
      const fineType = await ctx.prisma.fineType.findUnique({
        where: {
          id: input.fineTypeId,
        },
      })

      // Throw error if no fine type is found
      invariant(fineType, 'No fine type was found')

      // Create the new fine and return it with the owner
      const result = await ctx.prisma.fine.create({
        data: {
          title: fineType.title,
          price: fineType.price,
          owner: {
            connect: {
              id: input.ownerId,
            },
          },
        },
        include: {
          owner: true,
        },
      })

      return fineTransformer(result)
    },
  })
  .mutation('pay', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }): Promise<Fine> {
      const fine = await ctx.prisma.fine.findUnique({
        where: {
          id: input.id,
        },
      })

      invariant(fine, 'No fine was found')

      /**
       * If the user is not an admin, we can assume the pay action is valid
       */
      if (!ctx.isAdmin) {
        const isOwner = ctx.user?.id === fine.ownerId

        // Throw error if the user is not an admin
        if (!isOwner) {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'You are not the owner of this fine',
          })
        }

        if (fine.status === 'PENDING') {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'This fine is already pending',
          })
        }

        if (fine.status === 'PAID') {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'This fine is already paid',
          })
        }
      }

      // Update the fine and return it with the owner
      const result = await ctx.prisma.fine.update({
        where: {
          id: input.id,
        },
        data: {
          status: 'PENDING',
        },
        include: {
          owner: true,
        },
      })

      return fineTransformer(result)
    },
  })
  .mutation('unpay', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }): Promise<Fine> {
      const fine = await ctx.prisma.fine.findUnique({
        where: {
          id: input.id,
        },
      })

      invariant(fine, 'No fine was found')

      const isOwner = ctx.user?.id === fine.ownerId

      // Throw error if the user is not an admin
      if (!isOwner) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You are not the owner of this fine',
        })
      }

      if (fine.status === 'UNPAID') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'This fine is not paid',
        })
      }

      if (fine.status === 'PAID') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'This fine is already paid',
        })
      }

      // Update the fine and return it with the owner
      const result = await ctx.prisma.fine.update({
        where: {
          id: input.id,
        },
        data: {
          status: 'UNPAID',
        },
        include: {
          owner: true,
        },
      })

      return fineTransformer(result)
    },
  })
  .query('pending', {
    resolve: async ({ ctx }) => {
      const [count, fines] = await ctx.prisma.$transaction([
        ctx.prisma.fine.count({
          where: {
            status: 'PENDING',
          },
        }),
        ctx.prisma.fine.findMany({
          where: {
            status: 'PENDING',
          },
          include: {
            owner: true,
          },
          orderBy: [{ createdAt: 'asc' }],
        }),
      ])

      return {
        count,
        fines: fines.map(fineTransformer),
      }
    },
  })
  .query('unpaid', {
    resolve: async ({ ctx }) => {
      const [count, fines] = await ctx.prisma.$transaction([
        ctx.prisma.fine.count({
          where: {
            status: 'UNPAID',
          },
        }),
        ctx.prisma.fine.findMany({
          where: {
            status: 'UNPAID',
          },
          include: {
            owner: true,
          },
          orderBy: [{ createdAt: 'asc' }],
        }),
      ])

      return {
        count,
        fines: fines.map(fineTransformer),
      }
    },
  })
