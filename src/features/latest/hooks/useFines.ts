import ms from 'ms'
import { useCallback } from 'react'

import { ITEMS_PER_PAGE } from '@config/constants'
import { trpc } from '@utils/trpc'
import { pagination } from '@utils/pagination'

type Params = {
  perPage: number
  page: number
}

export function useFines({ page = 0, perPage = ITEMS_PER_PAGE }: Params) {
  const { prefetchQuery } = trpc.useContext()

  const { data, ...rest } = trpc.useQuery(['fines.all', { page, perPage }], {
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

    return prefetchQuery(['fines.all', { page: page + 1, perPage }], {
      staleTime: ms('10s'),
    })
  }, [hasMore, page, perPage, prefetchQuery])

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
