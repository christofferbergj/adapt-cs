import type { NextPage, InferGetStaticPropsType } from 'next'

import { Layout } from '@components/common/Layout'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const Create: NextPage<Props> = ({ hello }) => {
  return (
    <Layout>
      <div className="bg-red-6 mx-auto px-5 py-16 max-w-prose">
        <h2>{hello}</h2>
      </div>
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

export default Create
