import type { GetStaticProps } from 'next'
import { createSSGHelpers } from '@trpc/react/ssg'

import { amountOfFines } from '@config/constants'
import { appRouter } from '@server/routers/_app'
import { createContext } from '@server/context'
import { transformer } from '@utils/trpc'
import { usePrefetchOwnFines } from '@features/fine/hooks/usePrefetchOwnFines'

import { ExtendedNextPage } from '@pages/_app'
import { FinesOverview } from '@components/pages/overview/FinesOverview'

const Home: ExtendedNextPage = () => {
  /**
   * Prefetching own fines from the front page as the user lands here after login,
   * and the list of own fines can't be statically rendered due to authentication requirements.
   */
  usePrefetchOwnFines()

  return (
    <>
      <FinesOverview />
    </>
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

export default Home
