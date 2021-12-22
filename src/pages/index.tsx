import type { InferGetStaticPropsType, NextPage } from 'next'
import { createSSGHelpers } from '@trpc/react/ssg'

import { amountOfFines } from '@config/constants'
import { appRouter } from '@server/routers/_app'
import { createContext } from '@server/context'
import { transformer } from '@utils/trpc'

import { FinesOverview } from '@components/pages/overview/FinesOverview'
import { Layout } from '@components/common/Layout'
import { Leaders } from '@components/pages/overview/Leaders'
import { MostPaidFines } from '@components/pages/overview/MostPaidFines'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Overview: NextPage<Props> = () => {
  return (
    <Layout>
      <Layout.Space>
        {/*<Leaders />*/}
        {/*<MostPaidFines />*/}
        <FinesOverview />
      </Layout.Space>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer,
  })

  await ssg.fetchQuery('fines.all', { take: amountOfFines, skip: 0 })

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  }
}

export default Overview
