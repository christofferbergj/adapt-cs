import { useEffect, useState } from 'react'

import { ITEMS_PER_PAGE } from '@config/constants'
import { useFines } from '@features/latest/hooks/useFines'

import { Container } from '@app/core/components/layout/Container'

export const LatestFines = () => {
  const [page, setPage] = useState(0)

  const {
    fines,
    isLoading,
    isPreviousData,
    isFetching,
    prefetchNextPage,
    meta: { count, current, hasMore, pageTotal },
  } = useFines({ page, perPage: ITEMS_PER_PAGE })

  useEffect(() => {
    if (!isFetching && hasMore) prefetchNextPage()
  }, [hasMore, isFetching, prefetchNextPage])

  return (
    <Container>
      <h2>hello world</h2>
    </Container>
  )
}
