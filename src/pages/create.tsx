import type { GetStaticProps } from 'next'
import { createSSGHelpers } from '@trpc/react/ssg'

import type { ExtendedNextPage } from '@pages/_app'
import { appRouter } from '@server/routers/_app'
import { createContext } from '@server/context'
import { transformer } from '@utils/trpc'
import { useFineTypes } from '@features/fine-types/hooks/useFineTypes'
import { useUsers } from '@features/user/hooks/useUsers'

import { Container } from '@components/layout/Container'

const Create: ExtendedNextPage = () => {
  const { fineTypes } = useFineTypes()
  const { users } = useUsers()

  return (
    <Container>
      <h2>hello world</h2>
    </Container>
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

Create.requireAdmin = true

export default Create
