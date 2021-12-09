import api from '@application/api'
import type { Fine } from '@features/fine/entities/types'
import type { FineAdapter } from '@application/ports'
import type { GetResponseData } from '@api/fines'
import { getErrorMessage } from '@utils/getErrorMessage'

type GetFines = FineAdapter['getFines']

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

    return data.map(transformer)
  } catch (error) {
    const message = getErrorMessage(error)
    console.warn(message)

    return []
  }
}
