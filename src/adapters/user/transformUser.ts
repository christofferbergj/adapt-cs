import Prisma from '@prisma/client'
import { type User, UserRole } from '@domain/user'

/**
 * Transform an input with user data to our own User entity
 *
 * @param input - Input with user data
 *
 * @see {User} - Our entity
 *
 * @returns A user matching our defined user entity
 */
export function transformUser(input: Prisma.User): User {
  const { id, name, image, email, role } = input

  return {
    id,
    email,
    name,
    avatar: image,
    role: role === 'ADMIN' ? UserRole.Admin : UserRole.User,
  }
}
