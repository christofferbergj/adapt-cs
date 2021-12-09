import api from '@application/api'
import type { Fine } from '@features/fine/entities/types'
import type { FineAdapter } from '@application/ports'
import type { ResponseData } from '@api/fines/[id]'
import { getErrorMessage } from '@utils/getErrorMessage'

export const getFine: FineAdapter['getFine'] = async (id: Fine['id']) => {
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
