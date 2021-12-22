import type { InferGetStaticPropsType, NextPage } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { useSession } from 'next-auth/react'

import { getFineTypes } from '@features/fine-types/adapters/getFineTypes'
import { getUsers } from '@features/user/adapters/getUsers'
import { queryKeys } from '@config/constants'
import { useUsers } from '@features/user/hooks/useUsers'

import { Container } from '@components/layout/Container'
import { Layout } from '@components/common/Layout'
import steffen from '/public/steffen.png'
import Image from 'next/image'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const Create: NextPage<Props> = () => {
  const { users } = useUsers()

  const { data: session } = useSession()

  if (session?.user.role === 'USER') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Image
          alt="steffen"
          src={steffen}
          placeholder="blur"
          width={300}
          height={300}
        />

        <h1 className="mt-10 text-2xl font-bold border border-purple-9 px-4 py-2 bg-purple-3">
          You are not an admin
        </h1>
      </div>
    )
  }

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
