import type { NextPage, InferGetStaticPropsType } from 'next'
import { createSSGHelpers } from '@trpc/react/ssg'

import { appRouter } from '@server/routers/_app'
import { createContext } from '@server/context'
import { transformer } from '@utils/trpc'

import { Layout } from '@components/common/Layout'
import { Leaders } from '@components/pages/overview/Leaders'
import { MostPaidFines } from '@components/pages/overview/MostPaidFines'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const Statistics: NextPage<Props> = () => {
  return (
    <Layout>
      <Layout.Space>
        <Leaders />
        <MostPaidFines />
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

  await Promise.all([
    ssg.fetchQuery('fines.leaders'),
    ssg.fetchQuery('fines.most-paid'),
  ])

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  }
}

export default Statistics
