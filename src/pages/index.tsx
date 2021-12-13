import type { InferGetStaticPropsType, NextPage } from 'next'
import { dehydrate, QueryClient } from 'react-query'

import { getFines } from '@features/fine/adapters/getFines'
import { getLeaders } from '@features/fine/adapters/getLeaders'
import { getMostPaidFines } from '@features/fine/adapters/getMostPaidFines'
import { amountOfFines, queryKeys } from '@config/constants'

import { FinesOverview } from '@components/pages/overview/FinesOverview'
import { Layout } from '@components/common/Layout'
import { Leaders } from '@components/pages/overview/Leaders'
import { MostPaidFines } from '@components/pages/overview/MostPaidFines'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(queryKeys.leaders, getLeaders)
  await queryClient.prefetchQuery(queryKeys.mostPaidFines, getMostPaidFines)
  await queryClient.prefetchQuery([queryKeys.fines, 0], () =>
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
  return (
    <Layout>
      <div className="py-10 md:mt-10 lg:py-14 flex flex-col gap-16 md:gap-24">
        <Leaders />
        <MostPaidFines />
        <FinesOverview />
      </div>
    </Layout>
  )
}

export default Overview
