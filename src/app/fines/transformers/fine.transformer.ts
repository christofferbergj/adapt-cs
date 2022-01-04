import type Prisma from '@prisma/client'

import type { Fine, FineStatus } from '@app/fines'
import { UserRole } from '@app/users'

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
export const fineTransformer = (input: Input): Fine => {
  const { createdAt, id, owner, paid, updatedAt, price, title, status } = input

  const getStatus = (status: typeof input['status']): FineStatus => {
    switch (status) {
      case 'PENDING':
        return 'pending'
      case 'PAID':
        return 'paid'
      case 'UNPAID':
        return 'unpaid'

      default:
        throw new Error('Not implemented')
    }
  }

  return {
    id,
    createdAt: createdAt.toString(),
    updatedAt: updatedAt.toString(),
    isPaid: paid,
    status: getStatus(status),
    title,
    price,
    owner: {
      id: owner.id,
      name: owner.name,
      email: owner.email,
      role: owner.role === 'ADMIN' ? UserRole.Admin : UserRole.User,
      avatar: owner.image,
    },
  }
}
