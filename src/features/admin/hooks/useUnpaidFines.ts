import ms from 'ms'
import { useCallback } from 'react'

import { InferQueryInput } from '@server/types'
import { ITEMS_PER_PAGE } from '@config/constants'
import { trpc } from '@utils/trpc'
import { pagination } from '@utils/pagination'

type Params = Omit<InferQueryInput<'fines.unpaid'>, 'skip'> & {
  page: number
}

export function useUnpaidFines({ page = 0, take = ITEMS_PER_PAGE }: Params) {
  const { prefetchQuery } = trpc.useContext()

  const skip = pagination.getSkip({ page, take })

  const { data, ...rest } = trpc.useQuery(['fines.unpaid', { take, skip }], {
    keepPreviousData: true,
    staleTime: ms('10s'),
  })

  const count = data?.count ?? 0
  const fines = data?.fines ?? []

  const { current, hasMore, pageTotal } = pagination.getMeta({
    count,
    page,
    take,
    skip,
  })

  const prefetchNextPage = useCallback(() => {
    if (!hasMore) return

    const params: InferQueryInput<'fines.unpaid'> = {
      skip: skip === 0 ? take : skip + take,
      take,
    }

    return prefetchQuery(['fines.unpaid', params], {
      staleTime: ms('10s'),
    })
  }, [hasMore, prefetchQuery, skip, take])

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
