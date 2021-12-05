import api from '@services/api'
import type { Fine } from '@entities/fine/types'
import type { FineService } from '@application/ports'
import type { GetResponseData } from '@pages/api/fines'

import { getErrorMessage } from '@utils/getErrorMessage'
import { AsyncReturnType } from 'type-fest'

type GetFines = FineService['getFines']

export const getFines: GetFines = async () => {
  try {
    const { data } = await api.get<GetResponseData['fines']>('/fines')

    const transformer = (fine: typeof data[number]): Fine => {
      const { createdAt, fineType, id, owner, paid, updatedAt } = fine

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
        },
      }
    }

    const fines: AsyncReturnType<GetFines> = data.map(transformer)

    return fines
  } catch (error) {
    const message = getErrorMessage(error)
    console.warn(message)

    return []
  }
}
