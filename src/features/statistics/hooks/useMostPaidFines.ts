import ms from 'ms'
import { trpc } from '@server/types'

export function useMostPaidFines() {
  const { data, ...rest } = trpc.useQuery(['fines.most-paid'], {
    staleTime: ms('60s'),
  })

  const mostPaidFines = data ?? []

  return {
    mostPaidFines,
    ...rest,
  }
}
