import type { ResponseData } from '@api/fines/[id]'
import type { Fine } from '@entities/fine/types'
import type { FineService } from '@application/ports'

import api from '@services/api'
import { getErrorMessage } from '@utils/getErrorMessage'

export const getFine: FineService['getFine'] = async (id: Fine['id']) => {
  try {
    const { data } = await api.get<ResponseData['fine']>(`/fines/${id}`)

    if (!data) return null

    const fine: Fine = {
      id: data.id,
      isPaid: data.paid,
      updatedAt: data.updatedAt.toString(),
      createdAt: data.createdAt.toString(),
      fineType: {
        id: data.fineType.id,
        title: data.fineType.title,
        price: data.fineType.price,
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
    console.error(message)

    return null
  }
}
