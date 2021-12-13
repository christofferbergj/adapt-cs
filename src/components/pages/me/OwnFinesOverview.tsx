import Image from 'next/image'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

import { useOwnFines } from '@features/fine/use-cases/useOwnFines'

import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import { Container } from '@components/layout/Container'
import { Overview } from '@components/elements/Overview'

export const OwnFinesOverview = () => {
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
    <Container className="relative mt-4">
      {fines && fines.length > 0 ? (
        <div>
          <Overview>
            <div className="hidden items-center lg:gap-8 lg:flex p-5 bg-gray-2 border-b border-gray-6 font-bold">
              <span className="basis-52">Bødetager</span>
              <span className="basis-36">Bøde</span>
              <span className="basis-36">Dato</span>
              <span className="flex-1">Pris</span>
              <span className="flex-1">Status</span>
            </div>

            {fines.map((fine) => (
              <div
                key={fine.id}
                className="items-center lg:gap-8 lg:flex p-5 border-b border-gray-6 min-h-[80px] font-medium divide-y divide-dashed divide-gray-6 lg:divide-none"
              >
                <Overview.Name>
                  {fine.owner.avatar ? (
                    <div className="w-[24px] h-[24px] rounded-full overflow-hidden">
                      <Image
                        width={24}
                        height={24}
                        src={fine.owner.avatar}
                        alt="avatar"
                      />
                    </div>
                  ) : null}

                  <span>{fine.owner.name}</span>
                </Overview.Name>

                <Overview.Fee>
                  <span>{fine.fineType.title}</span>
                </Overview.Fee>

                <Overview.Date>
                  <span>
                    {dayjs(fine.createdAt).format('DD.MM.YYYY - HH:mm')}
                  </span>
                </Overview.Date>

                <Overview.Price>
                  <span>{fine.fineType.price} kr.</span>
                </Overview.Price>

                <Overview.Status>
                  <span
                    className={clsx('w-[10px] h-[10px] rounded-full', {
                      'bg-green-9': fine.isPaid,
                      'bg-red-9': !fine.isPaid,
                    })}
                  />

                  <span>{fine.isPaid ? 'Betalt' : 'Ikke betalt'}</span>
                </Overview.Status>

                <div className="flex flex-col lg:ml-auto pt-4 sm:pt-5 text-center lg:pt-0 hidden">
                  <span
                    className={clsx(
                      'border rounded px-4 py-3 font-semibold lg:py-2',
                      {
                        'border-green-6 text-green-11 bg-green-3': fine.isPaid,
                        'border-red-6 text-red-11 bg-red-3': !fine.isPaid,
                      }
                    )}
                  >
                    {fine.isPaid ? 'Betalt' : 'Ikke betalt'}
                  </span>
                </div>
              </div>
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
