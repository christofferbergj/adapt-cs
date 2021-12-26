import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { createSSGHelpers } from '@trpc/react/ssg'

import { appRouter } from '@server/routers/_app'
import { createContext } from '@server/context'
import { transformer } from '@utils/trpc'
import { useFineTypes } from '@features/fine-types/hooks/useFineTypes'
import { useUsers } from '@features/user/hooks/useUsers'

import { Container } from '@components/layout/Container'
import { Layout } from '@components/common/Layout'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Create: NextPage<Props> = () => {
  const { fineTypes } = useFineTypes()
  const { users } = useUsers()

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

export const getStaticProps: GetStaticProps = async () => {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer,
  })

  await Promise.all([
    ssg.fetchQuery('users.all'),
    ssg.fetchQuery('fineTypes.all'),
  ])

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  }
}

export default Create
