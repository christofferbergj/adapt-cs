import Image from 'next/image'
import clsx from 'clsx'
import dayjs from 'dayjs'
import type { InferGetStaticPropsType, NextPage } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { motion } from 'framer-motion'

import { getFines } from '@features/fine/adapters/getFines'
import { useFines } from '@features/fine/use-cases/useFines'

import steffen from '/public/steffen.png'
import { Container } from '@components/layout/Container'
import { Layout } from '@components/common/Layout'
import { useMedia } from 'react-use'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Overview: NextPage<Props> = () => {
  const { fines } = useFines()

  return (
    <Layout>
      <div className="py-20 lg:py-14">
        <Container className="relative">
          <MobileSteffen />
          <DesktopSteffen />

          {fines && fines.length > 0 ? (
            <div className="relative flex flex-col text-sm border border-gray-6 rounded-lg">
              {fines.map((fine) => (
                <div
                  key={fine.id}
                  className="grid gap-4 grid-cols-5 items-center p-5 bg-gray-1 border-b border-gray-6"
                >
                  <div className="flex flex-col">
                    <span className="font-bold">Betaler</span>
                    <span className="text-gray-11">{fine.owner.name}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-bold">Bøde</span>
                    <span className="text-gray-11">{fine.fineType.title}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-bold">Dato</span>
                    <span className="text-gray-11">
                      {dayjs(fine.createdAt).format('DD/MM/YYYY HH:mm')}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-bold">Status</span>
                    <span className="text-gray-11">
                      {fine.isPaid ? 'Betalt' : 'Ikke betalt'}
                    </span>
                  </div>

                  <span
                    className={clsx(
                      'ml-auto px-4 py-2 text-white font-bold bg-red-9 rounded'
                    )}
                  >
                    {fine.fineType.price} kr.
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </Container>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('fines', getFines)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      revalidate: 10,
    },
  }
}

const MobileSteffen = () => {
  const isWide = useMedia('(min-width: 768px)')

  const generateY = (length = 5) =>
    Array.from({ length }, () => ['0%', '5%']).flat()

  return (
    <div className="top-[-6%] md:top-[-9%] absolute z-0 left-0 w-full pointer-events-none overflow-hidden lg:hidden">
      <motion.div
        className="inline-block"
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
    </div>
  )
}

const DesktopSteffen = () => {
  return (
    <motion.div
      className="absolute z-0 left-5 top-10 hidden lg:block"
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
