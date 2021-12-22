import api from '@application/api'
import type { FineAdapter } from '@application/ports'
import type { GetResponseData } from '@api/fines'
import { transformFine } from '@features/fine/transformers/fines-list'
import { getErrorMessage } from '@utils/getErrorMessage'

type GetFines = FineAdapter['getOwnFines']

export const getOwnFines: GetFines = async (params) => {
  try {
    const { data } = await api.get<GetResponseData>('/fines/own', {
      params: {
        skip: params?.skip,
        take: params?.take,
      },
    })

    return {
      fines: data.fines.map(transformFine),
      count: data.count,
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
