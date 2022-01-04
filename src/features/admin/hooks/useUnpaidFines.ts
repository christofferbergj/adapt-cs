import ms from 'ms'
import { useCallback } from 'react'

import { InferQueryInput } from '@server/types'
import { ITEMS_PER_PAGE } from '@config/constants'
import { trpc } from '@utils/trpc'
import { pagination } from '@utils/pagination'

type Params = {
  perPage: number
  page: number
}

export function useUnpaidFines({ page = 0, perPage = ITEMS_PER_PAGE }: Params) {
  const { prefetchQuery } = trpc.useContext()

  const { skip, take, nextSkip } = pagination.getSkipTake({ page, perPage })

  const { data, ...rest } = trpc.useQuery(['fines.unpaid', { take, skip }], {
    keepPreviousData: true,
    staleTime: ms('10s'),
  })

  const count = data?.count ?? 0
  const fines = data?.fines ?? []

  const { current, hasMore, pageTotal } = pagination.getMeta({
    count,
    page,
    perPage,
  })

  const prefetchNextPage = useCallback(() => {
    if (!hasMore) return

    return prefetchQuery(['fines.unpaid', { take, skip: nextSkip }], {
      staleTime: ms('10s'),
    })
  }, [hasMore, nextSkip, prefetchQuery, take])

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
