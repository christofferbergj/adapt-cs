import type { GetStaticProps, NextPage } from 'next'
import { batch } from 'react-redux'
import { createSSGHelpers } from '@trpc/react/ssg'
import { useUnmount } from 'react-use'

import { addNotification } from '@features/notifications/notification.slice'
import { appRouter } from '@server/appRouter'
import { createContext } from '@server/context'
import { resetState } from '@features/create-fine/createFineSlice'
import { transformer } from '@server/types'
import { useAppDispatch } from '@redux/hooks'

import { Container } from '@app/core/components/layout/Container'
import { CreateFine } from '@features/create-fine/components/CreateFine'
import { FineTypesList } from '@features/create-fine/components/FineTypesList'
import { UsersList } from '@features/create-fine/components/UsersList'

const Create: NextPage = () => {
  const dispatch = useAppDispatch()

  // Reset createFineState when the create page unmounts
  useUnmount(() => dispatch(resetState()))

  const addTestNotification = () => {
    dispatch(
      addNotification({
        message:
          'A great notification with very long text that sohuld break in separate lines',
        type: 'info',
      })
    )
  }

  const addTestNotifications = () => {
    batch(() => {
      dispatch(
        addNotification({
          message: 'A great notification',
          type: 'info',
        })
      )
      dispatch(
        addNotification({
          message: 'A great notification',
          type: 'success',
        })
      )
      dispatch(
        addNotification({
          message: 'A great notification',
          type: 'error',
        })
      )
      dispatch(
        addNotification({
          message: 'A great notification',
          type: 'warning',
        })
      )
    })
  }

  return (
    <Container>
      <div className="flex flex-col gap-16">
        <UsersList />
        <FineTypesList />
        <CreateFine />

        <button onClick={addTestNotifications}>Add test notifications</button>
        <button onClick={addTestNotification}>Add test notification</button>
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
