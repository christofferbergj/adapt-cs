import type { GetStaticProps, NextPage } from 'next'

import { ITEMS_PER_PAGE } from '@config/constants'
import { usePrefetchOwnFines } from '@features/my-fines/hooks/usePrefetchOwnFines'

import { Container } from '@app/core/components/layout/Container'
import { LatestFines } from '@features/latest/components/LatestFines'
import { Layout } from '@app/core/components/common/Layout'
import { getSSGHelpers } from '@server/ssg'

const Home: NextPage = () => {
  /**
   * Prefetching own fines from the front page as the user lands here after login,
   * and the list of own fines can't be statically rendered due to authentication requirements.
   */
  usePrefetchOwnFines()

  return (
    <Layout>
      <Layout.Space>
        <Container>
          <p>Graph view</p>
        </Container>

        <LatestFines />
      </Layout.Space>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const ssg = await getSSGHelpers()

  await ssg.fetchQuery('fines.all', { page: 0, perPage: ITEMS_PER_PAGE })

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  }
}

export default Home
