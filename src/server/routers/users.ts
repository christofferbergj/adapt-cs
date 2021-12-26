import type { User } from '@features/user/entities'
import { createRouter } from '@server/createRouter'

export const usersRouter = createRouter().query('all', {
  async resolve({ ctx }): Promise<User[]> {
    const result = await ctx.prisma.user.findMany()

    return result.map(({ email, id, image, name }) => ({
      id,
      name,
      email,
      avatar: image,
    }))
  },
})
