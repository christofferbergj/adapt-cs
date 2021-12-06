import type { NextPage, InferGetStaticPropsType } from 'next'
import { dehydrate, QueryClient } from 'react-query'

import { getUsers } from '@adapters/users/getUsers'
import { useCreateFine } from '@application/useCreateFine'
import { useUsers } from '@application/useUsers'

import { Container } from '@components/layout/Container'
import { Layout } from '@components/common/Layout'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const Create: NextPage<Props> = () => {
  const { mutate } = useCreateFine()
  const { users } = useUsers()

  const ownerId = 'ckwtoot9l0028riib2jtnp4wr'
  const fineTypeId = 'ckwtos5df0215veibsteu37pv'

  return (
    <Layout>
      <Container>
        <div className="py-14">
          {users && users.length > 0 ? (
            <div>
              {users.map((user) => (
                <div key={user.id}>
                  <p>{user.name}</p>
                </div>
              ))}
            </div>
          ) : null}

          <button
            className="border-purple-6 px-3 py-1 text-sm border rounded"
            onClick={() => mutate({ ownerId, fineTypeId })}
          >
            Create dummy fine
          </button>
        </div>
      </Container>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('users', getUsers)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      revalidate: 10,
    },
  }
}

export default Create
