import ms from 'ms'

import { trpc } from '@utils/trpc'

export function useUnpaidFines() {
  const { data, ...rest } = trpc.useQuery(['fines.unpaid'], {
    keepPreviousData: true,
    staleTime: ms('10s'),
  })

  const count = data?.count ?? 0
  const fines = data?.fines ?? []

  return {
    fines,
    meta: {
      count,
    },
    ...rest,
  }
}
