import invariant from 'tiny-invariant'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import type { Fine, FineLeader, FineList, MostPaidFine } from '@domain/fine'
import { amountOfFines } from '@config/constants'
import { createRouter } from 'server/createRouter'
import { transformFine } from '@adapters/fine/transformFine'
import { nanoid } from 'nanoid'
import { getSession } from 'next-auth/react'
import { hasAdminRole } from '@domain/user/hasAdminRole'

export const finesRouter = createRouter()
  .query('all', {
    input: z.object({
      take: z.number().min(1).optional(),
      skip: z.number().min(0).optional(),
    }),
    async resolve({ ctx, input }): Promise<FineList> {
      const [count, fines] = await ctx.prisma.$transaction([
        ctx.prisma.fine.count(),
        ctx.prisma.fine.findMany({
          take: input?.take ?? amountOfFines,
          skip: input?.skip ?? 0,
          include: {
            owner: true,
          },
          orderBy: [{ paid: 'asc' }, { createdAt: 'desc' }],
        }),
      ])

      return {
        count,
        fines: fines.map(transformFine),
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
            title: 'desc',
          },
        },
      })

      return result.map(({ title, _count }) => ({
        id: nanoid(),
        title,
        paidTimes: _count,
      }))
    },
  })
  .query('own', {
    input: z.object({
      skip: z.number().min(0).optional(),
      take: z.number().min(1).optional(),
      userId: z.string().optional(),
    }),
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
        fines: fines.map(transformFine),
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
        orderBy: {
          fines: {
            _count: 'desc',
          },
        },
        take: 6,
      })

      return result.map(({ _count, fines, id, image, name }) => ({
        id,
        name: name ?? 'No name',
        totalPaid: fines.reduce((total, fine) => total + fine.price, 0),
        totalFines: _count.fines,
        avatar: image,
      }))
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

      return transformFine(result)
    },
  })
