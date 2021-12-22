import ms from 'ms'
import { trpc } from '@utils/trpc'

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
