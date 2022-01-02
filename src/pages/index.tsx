import type { GetStaticProps } from 'next'
import { createSSGHelpers } from '@trpc/react/ssg'

import { ITEMS_PER_PAGE } from '@config/constants'
import { appRouter } from '@server/appRouter'
import { createContext } from '@server/context'
import { transformer } from '@server/types'
import { usePrefetchOwnFines } from '@features/my-fines/hooks/usePrefetchOwnFines'

import { ExtendedNextPage } from '@pages/_app'
import { LatestFines } from '@features/latest/components/LatestFines'

const Home: ExtendedNextPage = () => {
  /**
   * Prefetching own fines from the front page as the user lands here after login,
   * and the list of own fines can't be statically rendered due to authentication requirements.
   */
  usePrefetchOwnFines()

  return <LatestFines />
}

export const getStaticProps: GetStaticProps = async () => {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer,
  })

  await ssg.fetchQuery('fines.all', { take: ITEMS_PER_PAGE, skip: 0 })

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  }
}

export default Home
