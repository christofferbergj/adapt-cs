import type Prisma from '@prisma/client'

import type { Fine } from '@domain/fine'
import { UserRole } from '@domain/user'

type Input = Prisma.Fine & {
  owner: Prisma.User
}

/**
 * Transform an input of fine data to our Fine entity
 *
 * @param input - An input with fine data
 *
 * @returns - A fine
 *
 * @see {Fine} Our fine entity
 */
export const transformFine = (input: Input): Fine => {
  const { createdAt, id, owner, paid, updatedAt, price, title } = input

  return {
    id,
    createdAt: createdAt.toString(),
    updatedAt: updatedAt.toString(),
    isPaid: paid,
    title,
    price,
    owner: {
      id: owner.id,
      name: owner.name ?? 'No owner',
      email: owner.email ?? 'No email',
      role: owner.role === 'ADMIN' ? UserRole.Admin : UserRole.User,
      avatar: owner.image,
    },
  }
}
