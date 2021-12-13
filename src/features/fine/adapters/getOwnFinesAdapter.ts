import api from '@application/api'
import type { FineAdapter } from '@application/ports'
import type { GetResponseData } from '@api/fines'
import { finesListTransformer } from '@features/fine/transformers/finesListTransformer'
import { getErrorMessage } from '@utils/getErrorMessage'

type GetFines = FineAdapter['getOwnFines']

export const getOwnFinesAdapter: GetFines = async (params) => {
  try {
    const { data } = await api.get<GetResponseData>('/fines/own', {
      params: {
        skip: params?.skip,
        take: params?.take,
      },
    })

    return {
      fines: data.fines.map(finesListTransformer),
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
