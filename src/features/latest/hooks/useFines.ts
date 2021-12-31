import ms from 'ms'
import { useCallback } from 'react'

import { InferQueryInput, trpc } from '@utils/trpc'
import { amountOfFines } from '@config/constants'

type Params = Omit<InferQueryInput<'fines.all'>, 'skip'> & {
  page: number
}

export function useFines({ page = 0, take = amountOfFines }: Params) {
  const skip = page * take
  const { prefetchQuery } = trpc.useContext()

  const { data, ...rest } = trpc.useQuery(['fines.all', { take, skip }], {
    keepPreviousData: true,
    staleTime: ms('10s'),
  })

  const count = data?.count ?? 0
  const fines = data?.fines ?? []

  const current = page === 0 ? 1 : page * take
  const hasMore = skip + take < count
  const pageTotal = (page + 1) * take

  const prefetchNextPage = useCallback(() => {
    if (!hasMore) return

    const params: InferQueryInput<'fines.all'> = {
      skip: skip === 0 ? take : skip + take,
      take,
    }

    return prefetchQuery(['fines.all', params], {
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
