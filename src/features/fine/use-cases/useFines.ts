import ms from 'ms'
import { useCallback } from 'react'
import { useQuery, useQueryClient } from 'react-query'

import { getFines } from '@features/fine/adapters/getFines'
import { queryKeys } from '@config/constants'

type Params = {
  page?: number
  take?: number
}

export function useFines({ page = 0, take = 10 }: Params) {
  const queryClient = useQueryClient()
  const skip = page * take

  const { data, ...rest } = useQuery(
    [queryKeys.fines, page],
    () => getFines({ skip, take: take }),
    { keepPreviousData: true, staleTime: ms('10s') }
  )

  const count = data?.count ?? 0
  const fines = data?.fines ?? []

  const current = page === 0 ? 1 : page + take
  const hasMore = skip + take < count
  const pageTotal = (page + 1) * take

  const prefetchNextPage = useCallback(() => {
    if (!hasMore) return

    return queryClient.prefetchQuery(
      [queryKeys.fines, page + 1],
      () =>
        getFines({
          skip: skip === 0 ? take : skip + take,
          take: take,
        }),
      { staleTime: ms('10s') }
    )
  }, [take, hasMore, page, queryClient, skip])

  return {
    fines,
    prefetchNextPage,
    meta: {
      hasMore,
      count,
      current,
      pageTotal,
    },
    ...rest,
  }
}
