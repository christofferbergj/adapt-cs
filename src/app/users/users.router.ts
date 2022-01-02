import { type User, UserRole } from '@app/users/index'
import { createRouter } from '@server/createRouter'

export const usersRouter = createRouter().query('all', {
  async resolve({ ctx }): Promise<User[]> {
    const result = await ctx.prisma.user.findMany()

    return result.map(({ email, id, image, name, role }) => ({
      id,
      name,
      email,
      role: role === 'ADMIN' ? UserRole.Admin : UserRole.User,
      avatar: image,
    }))
  },
})
