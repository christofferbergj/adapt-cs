import { useSession } from 'next-auth/react'

import { amountOfFines } from '@config/constants'
import { trpc } from '@utils/trpc'

/**
 * Prefetch a list of the logged-in users fines
 */
export function usePrefetchOwnFines() {
  const { data: session } = useSession()
  const { prefetchQuery } = trpc.useContext()

  const userId = session?.user.id

  if (userId) {
    prefetchQuery(['fines.own', { userId, take: amountOfFines, skip: 0 }])
  }
}
