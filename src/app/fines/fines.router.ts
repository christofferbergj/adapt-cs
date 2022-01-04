import invariant from 'tiny-invariant'
import { TRPCError } from '@trpc/server'
import { nanoid } from 'nanoid'
import { z } from 'zod'

import type { Fine, FineLeader, FineList, MostPaidFine } from '@app/fines/index'
import { ITEMS_PER_PAGE } from '@config/constants'
import { createRouter } from '@server/createRouter'
import { hasAdminRole } from '@app/users/helpers/hasAdminRole'
import { fineTransformer } from '@app/fines/transformers/fine.transformer'
import {
  GetOwnInput,
  PaginationInput,
  SkipTakeInput,
} from '@app/fines/validations'
import { pagination } from '@utils/pagination'

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
        take: 6,
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

      return sortedByTotalPaid
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
  .query('unpaid', {
    input: SkipTakeInput,
    resolve: async ({ ctx, input }) => {
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
          take: input?.take ?? ITEMS_PER_PAGE,
          skip: input?.skip ?? 0,
          include: {
            owner: true,
          },
          orderBy: [{ createdAt: 'desc' }],
        }),
      ])

      return {
        count,
        fines: fines.map(fineTransformer),
      }
    },
  })
