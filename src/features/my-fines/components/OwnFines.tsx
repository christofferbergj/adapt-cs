import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

import { useOwnFines } from '@features/my-fines/hooks/useOwnFines'

import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import { Container } from '@app/core/components/layout/Container'
import { Overview } from '@app/core/components/elements/Overview'
import { Avatar } from '@app/core/components/elements/Avatar'
import { FineStatus } from '@app/fines/components/FineStatus'
import { FineActions } from '@features/my-fines/components/FineActions'

export const OwnFines = () => {
  const [page, setPage] = useState(0)
  const { data: session } = useSession()
  const userId = session?.user.id

  const {
    fines,
    isFetching,
    isLoading,
    isPreviousData,
    meta: { hasMore, current, pageTotal, count },
    prefetchNextPage,
  } = useOwnFines({ userId, page })

  useEffect(() => {
    if (!isFetching && hasMore) prefetchNextPage()
  }, [hasMore, isFetching, prefetchNextPage])

  return (
    <Container className="relative">
      {fines && fines.length > 0 ? (
        <div>
          <Overview>
            <Overview.Header>
              <span className="basis-52">Bødetager</span>
              <span className="basis-36">Bøde</span>
              <span className="basis-36">Dato</span>
              <span className="flex-1">Pris</span>
              <span className="flex-1">Status</span>
              <span className="flex-1">Handlinger</span>
            </Overview.Header>

            {fines.map((fine) => (
              <Overview.Row key={fine.id}>
                <Overview.Name>
                  <Avatar
                    name={fine.owner.name}
                    imageUrl={fine.owner.avatar}
                    size="sm"
                  />
                  <span>{fine.owner.name}</span>
                </Overview.Name>

                <Overview.Fee>
                  <span>{fine.title}</span>
                </Overview.Fee>

                <Overview.Date>
                  <span>
                    {dayjs(fine.createdAt).format('DD.MM.YYYY - HH:mm')}
                  </span>
                </Overview.Date>

                <Overview.Price>
                  <span>{fine.price} kr.</span>
                </Overview.Price>

                <Overview.Status>
                  <FineStatus status={fine.status} />
                </Overview.Status>

                <Overview.Actions>
                  <FineActions fine={fine} />
                </Overview.Actions>
              </Overview.Row>
            ))}
          </Overview>

          <div className="flex w-full mt-4 gap-6 justify-end px-2 items-center text-sm">
            <span className="font-semibold">
              {current} - {pageTotal < count ? pageTotal : count} of {count}
            </span>

            <div className="flex items-center gap-2 text-sm">
              <button
                onClick={() => setPage((old) => Math.max(old - 1, 0))}
                disabled={page === 0}
                className="flex gap-2 items-center px-2 py-1 rounded border border-gray-7 hover:border-gray-8 hover:bg-gray-4 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ArrowLeftIcon />
              </button>

              <button
                onClick={() =>
                  !isPreviousData && hasMore && setPage((old) => old + 1)
                }
                disabled={isPreviousData || !hasMore || isLoading}
                className="flex gap-2 items-center px-2 py-1 rounded border border-gray-7 hover:border-gray-8 hover:bg-gray-4 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </Container>
  )
}
