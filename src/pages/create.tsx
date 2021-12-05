import type { NextPage, InferGetStaticPropsType } from 'next'

import { useCreateFine } from '@application/useCreateFine'

import { Container } from '@components/layout/Container'
import { Layout } from '@components/common/Layout'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const Create: NextPage<Props> = ({ hello }) => {
  const createFine = useCreateFine()

  const ownerId = 'ckwrx83l40058uyib2r2uygav'
  const fineTypeId = 'ckwt9apqv0057i3ib45bzxhym'

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
