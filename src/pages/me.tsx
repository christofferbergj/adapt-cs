import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { getSession } from 'next-auth/react'

import { finesListTransformer } from '@features/fine/transformers/finesListTransformer'
import { getOwnFinesQuery } from '@features/fine/server/getOwnFinesQuery'
import { queryKeys } from '@config/constants'

import { Layout } from '@components/common/Layout'
import { OwnFinesOverview } from '@components/pages/me/OwnFinesOverview'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const queryClient = new QueryClient()
  const session = await getSession(ctx)
  const userId = session?.user.id

  if (!userId) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const fetcher = async () => {
    const data = await getOwnFinesQuery({ userId })

    return {
      fines: data.fines.map(finesListTransformer),
      count: data.count,
    }
  }

  await queryClient.prefetchQuery([queryKeys.ownFines, 0], fetcher)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      revalidate: 10,
    },
  }
}

const Me: NextPage<Props> = () => {
  return (
    <Layout>
      <Layout.Space>
        <OwnFinesOverview />
      </Layout.Space>
    </Layout>
  )
}

export default Me
