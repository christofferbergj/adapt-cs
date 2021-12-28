import type { GetStaticProps } from 'next'
import { createSSGHelpers } from '@trpc/react/ssg'

import type { ExtendedNextPage } from '@pages/_app'
import { appRouter } from '@server/routers/_app'
import { createContext } from '@server/context'
import { transformer, trpc } from '@utils/trpc'
import { useAppDispatch } from '@redux/hooks'
import {
  setSelectedFineType,
  setSelectedUser,
  useSelectedFineType,
  useSelectedUser,
} from '@features/create-fine/createFineSlice'

import { Container } from '@components/layout/Container'
import { FineTypesList } from '@features/create-fine/components/FineTypesList'
import { UsersList } from '@features/create-fine/components/UsersList'
import { amountOfFines } from '@config/constants'

const Create: ExtendedNextPage = () => {
  const dispatch = useAppDispatch()
  const mutation = trpc.useMutation('fines.create')
  const selectedFineType = useSelectedFineType()
  const selectedUser = useSelectedUser()
  const { prefetchQuery } = trpc.useContext()

  const canCreateFine = selectedFineType && selectedUser

  const handleCreateFine = async () => {
    if (!canCreateFine) return

    try {
      await mutation.mutateAsync({
        ownerId: selectedUser,
        fineTypeId: selectedFineType,
      })

      dispatch(setSelectedFineType(null))
      dispatch(setSelectedUser(null))
      prefetchQuery(['fines.all', { skip: 0, take: amountOfFines }])
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Container>
      <div className="flex flex-col gap-16">
        <UsersList />
        <FineTypesList />

        <button
          onClick={handleCreateFine}
          disabled={!canCreateFine || mutation.isLoading}
          className="px-3 py-1 max-w-min whitespace-nowrap rounded border transition-colors duration-100 border-purple-7 hover:bg-purple-5 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Create fine
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

Create.requireAdmin = true

export default Create
