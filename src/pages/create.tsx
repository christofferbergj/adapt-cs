import type { GetStaticProps } from 'next'
import { createSSGHelpers } from '@trpc/react/ssg'

import type { ExtendedNextPage } from '@pages/_app'
import { appRouter } from '@server/routers/_app'
import { createContext } from '@server/context'
import { transformer } from '@utils/trpc'

import { Container } from '@components/layout/Container'
import { CreateFine } from '@features/create-fine/components/CreateFine'
import { FineTypesList } from '@features/create-fine/components/FineTypesList'
import { UsersList } from '@features/create-fine/components/UsersList'

const Create: ExtendedNextPage = () => {
  return (
    <Container>
      <div className="flex flex-col gap-16">
        <UsersList />
        <FineTypesList />
        <CreateFine />
      </div>
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
