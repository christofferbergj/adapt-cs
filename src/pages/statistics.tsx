import type { NextPage, InferGetStaticPropsType } from 'next'

import { Container } from '@components/layout/Container'
import { Layout } from '@components/common/Layout'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const Statistics: NextPage<Props> = ({ hello }) => {
  return (
    <Layout>
      <Container>
        <h2>{hello}</h2>
      </Container>
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
