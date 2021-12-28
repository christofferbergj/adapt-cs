import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { FineLeader, FineList, MostPaidFine } from '@domain/fine/entities'
import { amountOfFines } from '@config/constants'
import { createRouter } from 'server/createRouter'
import { prisma } from '@lib/prisma'
import { transformFine } from '@adapters/fine/transformFine'

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
            fineType: true,
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
      const result = await ctx.prisma.fineType.findMany({
        include: {
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

      return result.map(({ id, title, _count }) => ({
        id,
        title,
        paidTimes: _count.fines,
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
        prisma.fine.count({
          where: {
            ownerId: userId,
          },
        }),
        prisma.fine.findMany({
          take: take ?? 10,
          skip: skip ?? undefined,
          where: {
            ownerId: userId,
          },
          include: {
            owner: true,
            fineType: true,
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
              fineType: {
                select: {
                  price: true,
                },
              },
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
        totalPaid: fines.reduce(
          (total, fine) => total + fine.fineType.price,
          0
        ),
        totalFines: _count.fines,
        avatar: image,
      }))
    },
  })
