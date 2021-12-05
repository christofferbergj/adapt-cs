import type { NextPage, InferGetStaticPropsType } from 'next'

import { useCreateFine } from '@application/useCreateFine'

import { Container } from '@components/layout/Container'
import { Layout } from '@components/common/Layout'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const Create: NextPage<Props> = ({ hello }) => {
  const createFine = useCreateFine()

  const ownerId = 'ckws11137000809le3sn9lg3p'
  const fineTypeId = 'ckwrt6rxc002049ibq548p8uf'

  return (
    <Layout>
      <Container>
        <button
          className="border-purple-6 px-3 py-1 text-sm border rounded"
          onClick={() => createFine({ ownerId, fineTypeId })}
        >
          Create dummy fine
        </button>
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

export default Create
