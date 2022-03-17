import ms from 'ms'

import type { InferQueryInput } from '@server/types'
import { trpc } from '@utils/trpc'

type Params = InferQueryInput<'fines.own-unpaid'>

export function useOwnUnpaidFines({ userId }: Params) {
  const { data, ...rest } = trpc.useQuery(['fines.own-unpaid', { userId }], {
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
