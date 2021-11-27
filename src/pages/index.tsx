import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'

import { Layout } from '@components/common/Layout'
import { useSession } from 'next-auth/react'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Home: NextPage<Props> = ({ data }) => {
  const { data: session } = useSession()

  console.log('data', data)
  console.log('session', session)

  return (
    <Layout>
      <h2>Hello world</h2>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = {
    test: 'hello world',
  }

  return {
    props: {
      data,
    },
  }
}

export default Home
