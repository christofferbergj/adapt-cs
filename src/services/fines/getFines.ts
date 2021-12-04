import api from '@services/api'

import type { Fine } from '@entities/fine/types'
import type { FineService } from '@application/ports'
import { getErrorMessage } from '@utils/getErrorMessage'

export const getFines: FineService['getFines'] = async () => {
  try {
    const { data } = await api.get('/fines')

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
  } catch (error) {
    const message = getErrorMessage(error)
    console.warn(message)

    return []
  }
}
