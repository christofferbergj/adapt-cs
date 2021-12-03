import Prisma from '.prisma/client'
import axios from 'axios'

import type { Fine } from '@entities/fine/types'
import type { FineService } from '@application/ports'

type ApiResponse = (Prisma.Fine & {
  owner: Prisma.User
  fineType: Prisma.FineType
})[]

export const getFines: FineService['getFines'] = async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/api/fine')

    const transformer = (fine: typeof data[number]): Fine => ({
      id: fine.id,
      createdAt: fine.createdAt.toString(),
      updatedAt: fine.updatedAt.toString(),
      isPaid: fine.paid,
      fineType: {
        id: fine.fineType.id,
        price: fine.fineType.price,
        title: fine.fineType.title,
      },
      owner: {
        id: fine.owner.id,
        name: fine.owner.name ?? 'No owner',
        email: fine.owner.email ?? 'No email',
      },
    })

    const result: Fine[] = data.map(transformer)

    return result
  } catch (e) {
    console.warn('getFines catch', e)

    return []
  }
}
