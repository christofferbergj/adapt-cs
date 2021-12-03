import type { Fine } from '@entities/fine/types'
import type { FineService } from '@application/ports'
import { prisma } from '@lib/prisma'

export const createFine: FineService['createFine'] = async (fine) => {
  const { fineType, owner, isPaid = false } = fine

  try {
    const response = await prisma.fine.create({
      data: {
        fineTypeId: fineType.id,
        ownerId: owner.id,
        paid: isPaid,
      },
      include: {
        fineType: true,
        owner: true,
      },
    })

    const { createdAt, updatedAt, id, paid } = response
    const { name, id: ownerId, email } = response.owner
    const { price, id: fineTypeId, title } = response.fineType

    const result: Fine = {
      id: id,
      isPaid: paid,
      updatedAt: updatedAt.toString(),
      createdAt: createdAt.toString(),
      owner: {
        id: ownerId,
        email: email ?? 'No email',
        name: name ?? 'No name',
      },
      fineType: {
        id: fineTypeId,
        title,
        price,
      },
    }

    return result
  } catch (e) {
    console.warn(e)

    return null
  }
}
