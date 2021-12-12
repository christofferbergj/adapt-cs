import api from '@application/api'
import type { Fine } from '@features/fine'
import type { FineAdapter } from '@application/ports'
import type { GetResponseData } from '@api/fines'
import { getErrorMessage } from '@utils/getErrorMessage'

type GetFines = FineAdapter['getFines']

export const getFines: GetFines = async (params) => {
  try {
    const { data } = await api.get<GetResponseData>('/fines', {
      params: {
        skip: params?.skip,
        take: params?.take,
      },
    })

    const { fines, count } = data

    const transformer = (fine: typeof fines[number]): Fine => {
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
          avatar: owner.image,
        },
      }
    }

    return {
      fines: fines.map(transformer),
      count,
    }
  } catch (error) {
    const message = getErrorMessage(error)
    console.warn(message)

    return {
      fines: [],
      count: 0,
    }
  }
}
