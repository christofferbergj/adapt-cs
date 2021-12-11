import ms from 'ms'
import { useCallback } from 'react'
import { useQuery, useQueryClient } from 'react-query'

import { getFines } from '@features/fine/adapters/getFines'

export function useFines(page = 0, amount = 10) {
  const queryClient = useQueryClient()
  const skip = page * amount

  const { data, ...rest } = useQuery(
    ['fines', page],
    () => getFines({ skip, take: amount }),
    { keepPreviousData: true, staleTime: ms('10s') }
  )

  const count = data?.count ?? 0
  const fines = data?.fines ?? []

  const current = page === 0 ? 1 : page + amount
  const hasMore = skip + amount < count
  const pageTotal = (page + 1) * amount

  const prefetchNextPage = useCallback(() => {
    if (!hasMore) return

    return queryClient.prefetchQuery(
      ['fines', page + 1],
      () => getFines({ skip: skip === 0 ? amount : skip * 2, take: amount }),
      { staleTime: ms('10s') }
    )
  }, [amount, hasMore, page, queryClient, skip])

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
