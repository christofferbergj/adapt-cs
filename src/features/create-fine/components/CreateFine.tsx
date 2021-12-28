import clsx from 'clsx'
import { motion } from 'framer-motion'

import {
  setSelectedFineType,
  setSelectedUser,
  useSelectedFineType,
  useSelectedUser,
} from '@features/create-fine/createFineSlice'
import { trpc } from '@utils/trpc'
import { useAppDispatch } from '@redux/hooks'

export const CreateFine = () => {
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

      window.scroll({ behavior: 'smooth', top: 0 })
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={canCreateFine ? { opacity: 1 } : undefined}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        initial={{ y: 0 }}
        animate={canCreateFine ? { y: -20 } : undefined}
        className="flex fixed right-0 bottom-0 left-0 justify-center shadow"
      >
        <button
          onClick={handleCreateFine}
          disabled={!canCreateFine || mutation.isLoading}
          className={clsx(
            'px-4 py-3 md:max-w-min whitespace-nowrap rounded-lg transition-colors duration-100 disabled:opacity-40 disabled:cursor-not-allowed bg-purple-4 hover:bg-purple-5 active:bg-purple-6 text-purple-11 font-bold border border-purple-7 hover:border-purple-8 min-w-[180px]',
            {}
          )}
        >
          Create fine
        </button>
      </motion.div>
    </motion.div>
  )
}
