import type { NextPage, InferGetStaticPropsType } from 'next'
import { useQuery } from 'react-query'

import { getUsers } from '@adapters/users/getUsers'
import { useCreateFine } from '@application/useCreateFine'

import { Container } from '@components/layout/Container'
import { Layout } from '@components/common/Layout'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const Create: NextPage<Props> = (props) => {
  const { mutate } = useCreateFine()
  const { data: users, isLoading } = useQuery('users', getUsers, {
    initialData: props.users,
  })

  const ownerId = 'ckwtoot9l0028riib2jtnp4wr'
  const fineTypeId = 'ckwtos5df0215veibsteu37pv'

  return (
    <Layout>
      <Container>
        <div className="py-14">
          {isLoading ? (
            <p>Loading...</p>
          ) : users && users.length > 0 ? (
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
  const users = await getUsers()

  return {
    props: {
      users,
    },
  }
}

export default Create
