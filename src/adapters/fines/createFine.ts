import type { AsyncReturnType } from 'type-fest'

import api from '../api'
import type { FineAdapter } from '@application/ports'
import type { PostResponseData } from '@api/fines'
import { getErrorMessage } from '@utils/getErrorMessage'

export const createFine: FineAdapter['createFine'] = async (payload) => {
  try {
    const { data } = await api.post<PostResponseData['fine']>('/fines', payload)

    const fine: AsyncReturnType<FineAdapter['createFine']> = {
      id: data.id,
      isPaid: data.paid,
      createdAt: data.createdAt.toString(),
      updatedAt: data.updatedAt.toString(),
      fineType: {
        id: data.fineType.id,
        price: data.fineType.price,
        title: data.fineType.title,
      },
      owner: {
        id: data.owner.id,
        name: data.owner.name ?? '',
        email: data.owner.email ?? '',
      },
    }

    return fine
  } catch (error) {
    const message = getErrorMessage(error)

    throw new Error(message)
  }
}
