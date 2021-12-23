import type Prisma from '@prisma/client'

import type { Fine } from '@features/fine/entities'

type Input = Prisma.Fine & {
  owner: Prisma.User
  fineType: Prisma.FineType
}

/**
 * Transform an input of fine data to our Fine entity
 *
 * @param input - A fine input
 *
 * @see {Fine} Our entity
 */
export const transformFine = (input: Input): Fine => {
  const { createdAt, fineType, id, owner, paid, updatedAt } = input

  return {
    id,
    createdAt: createdAt.toString(),
    updatedAt: updatedAt.toString(),
    isPaid: paid,
    fineType: {
      id: fineType.id,
      price: fineType.price,
      title: fineType.title,
    },
    owner: {
      id: owner.id,
      name: owner.name ?? 'No owner',
      email: owner.email ?? 'No email',
      avatar: owner.image,
    },
  }
}
