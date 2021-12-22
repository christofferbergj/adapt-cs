import { useCallback } from 'react'

import { InferQueryInput, trpc } from '@utils/trpc'
import { amountOfFines } from '@config/constants'

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

  const { data, ...rest } = trpc.useQuery(
    ['fines.own', { userId, take, skip }],
    {
      keepPreviousData: true,
      enabled: !!userId,
    }
  )

  const count = data?.count ?? 0
  const fines = data?.fines ?? []

  const current = page === 0 ? 1 : page + take
  const hasMore = skip + take < count
  const pageTotal = (page + 1) * take

  const prefetchNextPage = useCallback(() => {
    if (!hasMore) return

    const params: InferQueryInput<'fines.own'> = {
      skip: skip === 0 ? take : skip + take,
      take,
      userId,
    }

    return prefetchQuery(['fines.own', params])
  }, [hasMore, prefetchQuery, skip, take, userId])

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
