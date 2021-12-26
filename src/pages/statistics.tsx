import { createSSGHelpers } from '@trpc/react/ssg'

import type { ExtendedNextPage } from '@pages/_app'
import { appRouter } from '@server/routers/_app'
import { createContext } from '@server/context'
import { transformer } from '@utils/trpc'

import { Leaders } from '@components/pages/overview/Leaders'
import { MostPaidFines } from '@components/pages/overview/MostPaidFines'

export const Statistics: ExtendedNextPage = () => {
  return (
    <div className="flex flex-col gap-12 md:gap-20">
      <Leaders />
      <MostPaidFines />
    </div>
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
