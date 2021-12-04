import type { NextPage, InferGetStaticPropsType } from 'next'

import { Layout } from '@components/common/Layout'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const Statistics: NextPage<Props> = ({ hello }) => {
  return (
    <Layout>
      <h2>{hello}</h2>
    </Layout>
  )
}

export const getStaticProps = async () => {
  return {
    props: {
      hello: 'hello world',
    },
  }
}

export default Statistics
