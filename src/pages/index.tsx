import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { createSSGHelpers } from '@trpc/react/ssg'
import { useSession } from 'next-auth/react'

import { amountOfFines } from '@config/constants'
import { appRouter } from '@server/routers/_app'
import { createContext } from '@server/context'
import { transformer, trpc } from '@utils/trpc'

import { FinesOverview } from '@components/pages/overview/FinesOverview'
import { Layout } from '@components/common/Layout'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Overview: NextPage<Props> = () => {
  const { data: session } = useSession()
  const { prefetchQuery } = trpc.useContext()

  const userId = session?.user.id

  /**
   * Prefetch data for "Own fines overview page"
   */
  if (userId) {
    prefetchQuery(['fines.own', { userId, take: amountOfFines, skip: 0 }])
  }

  return (
    <Layout>
      <Layout.Space>
        <FinesOverview />
      </Layout.Space>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
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
