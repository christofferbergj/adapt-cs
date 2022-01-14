import type { GetStaticProps, NextPage } from 'next'
import { createSSGHelpers } from '@trpc/react/ssg'

import { ITEMS_PER_PAGE } from '@config/constants'
import { appRouter } from '@server/appRouter'
import { createContext } from '@server/context'
import { transformer } from '@server/types'
import { usePrefetchOwnFines } from '@features/my-fines/hooks/usePrefetchOwnFines'

import { LatestFines } from '@features/latest/components/LatestFines'

const Home: NextPage = () => {
  /**
   * Prefetching own fines from the front page as the user lands here after login,
   * and the list of own fines can't be statically rendered due to authentication requirements.
   */
  usePrefetchOwnFines()

  return (
    <>
      <LatestFines />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer,
  })

  await ssg.fetchQuery('fines.all', { page: 0, perPage: ITEMS_PER_PAGE })

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  }
}

export default Home
