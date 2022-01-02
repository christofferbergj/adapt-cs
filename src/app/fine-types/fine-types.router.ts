import type { FineType } from '@app/fine-types/index'
import { createRouter } from '@server/createRouter'

export const fineTypesRouter = createRouter().query('all', {
  async resolve({ ctx }): Promise<FineType[]> {
    return await ctx.prisma.fineType.findMany({
      orderBy: {
        title: 'asc',
      },
    })
  },
})
