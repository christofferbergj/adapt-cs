import type { FineType } from '@domain/fine-type/entities'
import { createRouter } from '@server/createRouter'

export const fineTypesRouter = createRouter().query('all', {
  async resolve({ ctx }): Promise<FineType[]> {
    return await ctx.prisma.fineType.findMany()
  },
})
