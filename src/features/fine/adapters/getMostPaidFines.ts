import api from '@application/api'
import type { FineAdapter } from '@application/ports'
import type { GetResponseData } from '@api/fines/most-paid'
import { getErrorMessage } from '@utils/getErrorMessage'

type GetMostPaidFines = FineAdapter['getMostPaidFines']

export const getMostPaidFines: GetMostPaidFines = async () => {
  try {
    const { data } = await api.get<GetResponseData>('/fines/most-paid')

    return data.fines.map(({ id, title, _count }) => ({
      id,
      title,
      paidTimes: _count.fines,
    }))
  } catch (error) {
    const message = getErrorMessage(error)
    console.warn(message)

    return []
  }
}
