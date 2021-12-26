import ms from 'ms'
import { useCallback, useMemo } from 'react'

import type { InferQueryInput } from '@utils/trpc'
import { amountOfFines } from '@config/constants'
import { trpc } from '@utils/trpc'

type Params = Omit<InferQueryInput<'fines.own'>, 'skip'> & {
  page: number
}

export function useOwnFines({
  page = 0,
  take = amountOfFines,
  userId,
}: Params) {
  const skip = page * take
  const { prefetchQuery } = trpc.useContext()

  // Setup default query parameters for the query and the prefetch query
  const queryParams: InferQueryInput<'fines.own'> = useMemo(
    () => ({ skip, take, userId }),
    [skip, take, userId]
  )

  // Fetch all own fines
  const { data, ...rest } = trpc.useQuery(['fines.own', queryParams], {
    keepPreviousData: true,
    enabled: !!userId,
    staleTime: ms('10s'),
  })

  // Set default response values
  const count = data?.count ?? 0
  const fines = data?.fines ?? []

  // Calculate values for pagination
  const current = page === 0 ? 1 : page + take
  const hasMore = skip + take < count
  const pageTotal = (page + 1) * take

  //  Set up a fetcher for continuous prefetching of the next pagination page
  const prefetchNextPage = useCallback(() => {
    if (!hasMore) return

    return prefetchQuery([
      'fines.own',
      { ...queryParams, skip: skip === 0 ? take : skip + take },
    ])
  }, [hasMore, prefetchQuery, queryParams, skip, take])

  return {
    fines,
    prefetchNextPage,
    meta: {
      count,
      current,
      hasMore,
      pageTotal,
    },
    ...rest,
  }
}
