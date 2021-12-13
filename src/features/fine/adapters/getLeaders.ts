import api from '@application/api'
import type { FineAdapter } from '@application/ports'
import type { GetResponseData } from '@api/fines/leaders'
import { getErrorMessage } from '@utils/getErrorMessage'

type GetLeaders = FineAdapter['getLeaders']

export const getLeaders: GetLeaders = async () => {
  try {
    const { data } = await api.get<GetResponseData>('/fines/leaders')

    return data.leaders.map((leader) => ({
      id: leader.id,
      name: leader.name ?? 'No name',
      totalPaid: leader.fines.reduce(
        (total, fine) => total + fine.fineType.price,
        0
      ),
      totalFines: leader._count.fines,
      avatar: leader.image,
    }))
  } catch (error) {
    const message = getErrorMessage(error)
    console.warn(message)

    return []
  }
}
