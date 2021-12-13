import type { InferGetStaticPropsType, NextPage } from 'next'
import { dehydrate, QueryClient } from 'react-query'

import { getFineTypes } from '@features/fine-types/adapters/getFineTypes'
import { getUsers } from '@features/user/adapters/getUsers'
import { queryKeys } from '@config/constants'
import { useCreateFine } from '@features/fine/use-cases/useCreateFine'
import { useFineTypes } from '@features/fine-types/use-cases/useFineTypes'
import { useUsers } from '@features/user/use-cases/useUsers'

import { Container } from '@components/layout/Container'
import { Layout } from '@components/common/Layout'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const Create: NextPage<Props> = () => {
  const { fineTypes } = useFineTypes()
  const { mutate } = useCreateFine()
  const { users } = useUsers()

  const ownerId = 'ckwtoot9l0028riib2jtnp4wr'
  const fineTypeId = 'ckwtos5df0215veibsteu37pv'

  console.log('fineTypes', fineTypes)
  console.log('users', users)

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
            className="px-3 py-1 text-sm border border-purple-6 rounded"
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

  await queryClient.prefetchQuery(queryKeys.fineTypes, getFineTypes)
  await queryClient.prefetchQuery(queryKeys.users, getUsers)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      revalidate: 10,
    },
  }
}

export default Create
