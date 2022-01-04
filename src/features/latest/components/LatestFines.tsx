import Image from 'next/image'
import dayjs from 'dayjs'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useMedia } from 'react-use'

import { ITEMS_PER_PAGE } from '@config/constants'
import { useFines } from '@features/latest/hooks/useFines'

import steffen from '/public/steffen.png'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import { Avatar } from '@app/core/components/elements/Avatar'
import { Container } from '@app/core/components/layout/Container'
import { FineStatus } from '@app/fines/components/FineStatus'
import { Overview } from '@app/core/components/elements/Overview'

export const LatestFines = () => {
  const [page, setPage] = useState(0)

  const {
    fines,
    isLoading,
    isPreviousData,
    isFetching,
    prefetchNextPage,
    meta: { count, current, hasMore, pageTotal },
  } = useFines({ page, take: ITEMS_PER_PAGE })

  useEffect(() => {
    if (!isFetching && hasMore) prefetchNextPage()
  }, [hasMore, isFetching, prefetchNextPage])

  return (
    <Container className="relative mt-8 lg:mt-0">
      {fines && fines.length > 0 ? (
        <div className="relative">
          <MobileSteffen />
          <DesktopSteffen />

          <Overview>
            <Overview.Header>
              <span>Bødetager</span>
              <span>Bøde</span>
              <span>Dato</span>
              <span>Pris</span>
              <span>Status</span>
            </Overview.Header>

            {fines.map((fine) => {
              return (
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
                </Overview.Row>
              )
            })}
          </Overview>

          <div className="flex gap-6 justify-end items-center px-2 mt-4 w-full text-sm">
            <span className="font-semibold">
              {current} - {pageTotal < count ? pageTotal : count} of {count}
            </span>

            <div className="flex gap-2 items-center text-sm">
              <button
                onClick={() => setPage((old) => Math.max(old - 1, 0))}
                disabled={page === 0}
                className="flex gap-2 items-center px-2 py-1 rounded border transition-colors border-gray-7 hover:border-gray-8 hover:bg-gray-4 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ArrowLeftIcon />
              </button>

              <button
                onClick={() =>
                  !isPreviousData && hasMore && setPage((old) => old + 1)
                }
                disabled={isPreviousData || !hasMore || isLoading}
                className="flex gap-2 items-center px-2 py-1 rounded border transition-colors border-gray-7 hover:border-gray-8 hover:bg-gray-4 disabled:opacity-40 disabled:cursor-not-allowed"
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

const MobileSteffen = () => {
  const isWide = useMedia('(min-width: 768px)')

  const generateY = (length = 5) =>
    Array.from({ length }, () => ['0%', '5%']).flat()

  return (
    <div className="top-[-70px] absolute z-0 right-0 pointer-events-none lg:hidden">
      <motion.div
        className="inline-flex"
        animate={{
          x: isWide ? -240 : -160,
          y: generateY(6),
        }}
        transition={{
          repeat: Infinity,
          duration: isWide ? 2 : 2,
          repeatType: 'mirror',
        }}
      >
        <Image
          alt="steffen"
          src={steffen}
          placeholder="blur"
          width={160}
          height={160}
        />
      </motion.div>
    </div>
  )
}

const DesktopSteffen = () => {
  return (
    <motion.div
      className="hidden absolute left-5 top-20 z-0 lg:block"
      animate={{
        x: ['0%', '-50%', '-50%', '-50%', '0%'],
        rotate: [0, -12, -15, -12, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 5,
        repeatType: 'loop',
        repeatDelay: 3,
        delay: 3,
      }}
    >
      <Image
        alt="steffen"
        src={steffen}
        placeholder="blur"
        width={300}
        height={300}
      />
    </motion.div>
  )
}
