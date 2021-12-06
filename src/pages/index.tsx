import clsx from 'clsx'
import dayjs from 'dayjs'
import type { InferGetStaticPropsType, NextPage } from 'next'
import { dehydrate, QueryClient, useQuery } from 'react-query'

import { getFines } from '@adapters/fines/getFines'

import { Container } from '@components/layout/Container'
import { Layout } from '@components/common/Layout'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Overview: NextPage<Props> = () => {
  const { data: fines } = useQuery('fines', getFines)

  return (
    <Layout>
      <div className="py-14">
        <Container>
          {fines && fines.length > 0 ? (
            <div className="border-gray-6 flex flex-col text-sm border rounded-lg">
              {fines.map((fine) => (
                <div
                  key={fine.id}
                  className="border-gray-6 grid gap-4 grid-cols-5 items-center p-5 border-b"
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
                      'bg-red-9 ml-auto px-4 py-2 text-white font-bold rounded'
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
    },
  }
}

export default Overview
