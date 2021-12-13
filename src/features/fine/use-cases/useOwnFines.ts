import { useCallback } from 'react'
import { useQuery, useQueryClient } from 'react-query'

import { queryKeys } from '@config/constants'
import { getOwnFinesAdapter } from '@features/fine/adapters/getOwnFinesAdapter'

type Params = {
  page?: number
  take?: number
  userId?: string
}

export function useOwnFines({ page = 0, take = 10, userId }: Params) {
  const queryClient = useQueryClient()
  const skip = page * take

  const { data, ...rest } = useQuery(
    [queryKeys.ownFines, page],
    () => getOwnFinesAdapter({ skip, take }),
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

    return queryClient.prefetchQuery([queryKeys.ownFines, page + 1], () =>
      getOwnFinesAdapter({
        skip: skip === 0 ? take : skip + take,
        take,
        userId,
      })
    )
  }, [hasMore, queryClient, page, skip, take, userId])

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
