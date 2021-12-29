import type { GetStaticProps } from 'next'
import { createSSGHelpers } from '@trpc/react/ssg'
import { useUnmount } from 'react-use'

import type { ExtendedNextPage } from '@pages/_app'
import { appRouter } from '@server/routers/_app'
import { createContext } from '@server/context'
import { resetState } from '@features/create-fine/createFineSlice'
import { transformer } from '@utils/trpc'
import { useAppDispatch } from '@redux/hooks'

import { Container } from '@components/layout/Container'
import { CreateFine } from '@features/create-fine/components/CreateFine'
import { FineTypesList } from '@features/create-fine/components/FineTypesList'
import { UsersList } from '@features/create-fine/components/UsersList'
import { addNotification } from '@features/notifications/notification.slice'

const Create: ExtendedNextPage = () => {
  const dispatch = useAppDispatch()

  // Reset createFineState when the create page unmounts
  useUnmount(() => dispatch(resetState()))

  return (
    <Container>
      <div className="flex flex-col gap-16">
        <UsersList />
        <FineTypesList />
        <CreateFine />

        <button
          onClick={() =>
            dispatch(addNotification({ message: 'A great notification' }))
          }
        >
          Add test notification
        </button>
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

export default Create
