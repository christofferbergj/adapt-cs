import type { InferGetStaticPropsType, NextPage } from 'next'
import { dehydrate, QueryClient, useQueryClient } from 'react-query'
import { useSession } from 'next-auth/react'

import { amountOfFines, queryKeys } from '@config/constants'
import { getFines } from '@features/fine/adapters/getFines'
import { getLeaders } from '@features/fine/adapters/getLeaders'
import { getMostPaidFines } from '@features/fine/adapters/getMostPaidFines'
import { useFineAdapter } from '@features/fine/adapters'

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
  const queryClient = useQueryClient()
  const { data: session } = useSession()
  const { getOwnFines } = useFineAdapter()

  // Prefetch own fines for `My fines` page
  queryClient.prefetchQuery([queryKeys.ownFines, 0], () =>
    getOwnFines({ userId: session?.user.id })
  )

  return (
    <Layout>
      <Layout.Space>
        <Leaders />
        <MostPaidFines />
        <FinesOverview />
      </Layout.Space>
    </Layout>
  )
}

export default Overview
