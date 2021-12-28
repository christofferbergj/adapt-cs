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
import clsx from 'clsx'

const Create: ExtendedNextPage = () => {
  const dispatch = useAppDispatch()
  const mutation = trpc.useMutation('fines.create')
  const selectedFineType = useSelectedFineType()
  const selectedUser = useSelectedUser()

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
          // onClick={handleCreateFine}
          disabled={!canCreateFine || mutation.isLoading}
          className={clsx(
            'px-4 py-4 md:max-w-min whitespace-nowrap rounded-lg transition-colors duration-100 disabled:opacity-40 disabled:cursor-not-allowed bg-purple-4 hover:bg-purple-5 active:bg-purple-6 text-purple-11 font-bold border border-purple-7 hover:border-purple-8 min-w-[180px]',
            {}
          )}
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
