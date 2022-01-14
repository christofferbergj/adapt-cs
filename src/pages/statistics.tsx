import type { NextPage } from 'next'
import { createSSGHelpers } from '@trpc/react/ssg'

import { appRouter } from '@server/appRouter'
import { createContext } from '@server/context'
import { transformer } from '@server/types'

import { Layout } from '@app/core/components/common/Layout'
import { Leaders } from '@features/statistics/components/Leaders'
import { MostPaidFines } from '@features/statistics/components/MostPaidFines'

export const Statistics: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-12 md:gap-20">
        <Leaders />
        <MostPaidFines />
      </div>
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
