import { z } from 'zod'

import { amountOfFines } from '@config/constants'
import { createRouter } from 'server/createRouter'
import { transformFine } from '@features/fine/transformers/fines-list'

export const finesRouter = createRouter().query('all', {
  input: z
    .object({
      take: z.number().min(1).optional(),
      skip: z.number().min(0).optional(),
    })
    .optional(),
  async resolve({ ctx, input }) {
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
