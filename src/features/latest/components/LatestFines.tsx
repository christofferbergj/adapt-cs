import * as Tabs from '@radix-ui/react-tabs'
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
      <Tabs.Root defaultValue="my-fines" orientation="vertical">
        <div className="flex flex-col items-center">
          <Tabs.List
            aria-label="Fines tabs"
            className="p-1 w-11/12 rounded-full bg-gray-3 flex"
          >
            <Tabs.Trigger
              value="my-fines"
              className="px-4 py-2 font-semibold text-center rounded-full bg-gray-5 flex-1"
            >
              Mine bøder
            </Tabs.Trigger>

            <Tabs.Trigger
              value="overview"
              className="px-4 py-2 font-semibold text-center rounded-full bg-gray-5 flex-1"
            >
              Oversigt
            </Tabs.Trigger>
          </Tabs.List>
        </div>

        <Tabs.Content value="my-fines">
          <span>My fines</span>
        </Tabs.Content>

        <Tabs.Content value="overview">
          <span>Oversigt</span>
        </Tabs.Content>
      </Tabs.Root>
    </Container>
  )
}
