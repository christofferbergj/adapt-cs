import Image from 'next/image'
import clsx from 'clsx'
import dayjs from 'dayjs'
import type { InferGetStaticPropsType, NextPage } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useMedia } from 'react-use'

import { getFines } from '@features/fine/adapters/getFines'
import { useFines } from '@features/fine/use-cases/useFines'

import steffen from '/public/steffen.png'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import { Container } from '@components/layout/Container'
import { Layout } from '@components/common/Layout'

type Props = InferGetStaticPropsType<typeof getStaticProps>

/**
 * Amount of fines to show in the fines list
 *
 * The value needs to be synchronised between the call in statics props
 * and react-query on the client
 */
const amountOfFines = 10

export async function getStaticProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['fines', 0], () =>
    getFines({ take: amountOfFines })
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      revalidate: 10,
    },
  }
}

const Overview: NextPage<Props> = () => {
  const [page, setPage] = useState(0)

  const {
    fines,
    isLoading,
    isPreviousData,
    isFetching,
    prefetchNextPage,
    meta: { count, current, hasMore, pageTotal },
  } = useFines(page, amountOfFines)

  useEffect(() => {
    if (!isFetching && hasMore) prefetchNextPage()
  }, [hasMore, isFetching, prefetchNextPage])

  return (
    <Layout>
      <div className="py-20 lg:py-14">
        <Container className="relative">
          {fines && fines.length > 0 ? (
            <div>
              <MobileSteffen />
              <DesktopSteffen />

              <div className="relative flex flex-col text-sm border border-gray-6 rounded-lg overflow-hidden bg-gray-1 lg:min-h-[600px]">
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
                    <div className="flex pb-2 sm:pb-3 lg:pb-0 items-center gap-3 basis-52 text-lg lg:text-sm">
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
                    </div>

                    <div className="py-2 sm:py-3 lg:py-0 basis-36">
                      <span>{fine.fineType.title}</span>
                    </div>

                    <div className="py-2 sm:py-3 lg:py-0 basis-36">
                      <span>
                        {dayjs(fine.createdAt).format('DD.MM.YYYY - HH:mm')}
                      </span>
                    </div>

                    <div className="py-2 sm:py-3 lg:py-0 flex-1">
                      <span>{fine.fineType.price} kr.</span>
                    </div>

                    <div className="flex items-center gap-2 flex-1 pt-4 lg:pt-0">
                      <span
                        className={clsx('w-[10px] h-[10px] rounded-full', {
                          'bg-green-9': fine.isPaid,
                          'bg-red-9': !fine.isPaid,
                        })}
                      />

                      <span>{fine.isPaid ? 'Betalt' : 'Ikke betalt'}</span>
                    </div>

                    <div className="flex flex-col lg:ml-auto pt-4 sm:pt-5 text-center lg:pt-0 hidden">
                      <span
                        className={clsx(
                          'border rounded px-4 py-3 font-semibold lg:py-2',
                          {
                            'border-green-6 text-green-11 bg-green-3':
                              fine.isPaid,
                            'border-red-6 text-red-11 bg-red-3': !fine.isPaid,
                          }
                        )}
                      >
                        {fine.isPaid ? 'Betalt' : 'Ikke betalt'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

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
                  </button>{' '}
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
      </div>
    </Layout>
  )
}

const MobileSteffen = () => {
  const isWide = useMedia('(min-width: 768px)')

  const generateY = (length = 5) =>
    Array.from({ length }, () => ['0%', '5%']).flat()

  return (
    <div className="top-[-70px] absolute z-0 left-0 w-full pointer-events-none overflow-hidden lg:hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="inline-flex"
          animate={{
            x: 'calc(100vw - 95%)',
            y: isWide ? generateY(10) : generateY(6),
          }}
          transition={{
            repeat: Infinity,
            duration: isWide ? 3 : 2,
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
      </motion.div>
    </div>
  )
}

const DesktopSteffen = () => {
  return (
    <motion.div
      className="absolute z-0 left-5 top-20 hidden lg:block"
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

export default Overview
