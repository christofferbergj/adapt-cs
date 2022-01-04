import { useSession } from 'next-auth/react'

import { ITEMS_PER_PAGE } from '@config/constants'
import { trpc } from '@utils/trpc'

/**
 * Prefetch a list of the logged-in users fines
 */
export function usePrefetchOwnFines() {
  const { data: session } = useSession()
  const { prefetchQuery } = trpc.useContext()

  const userId = session?.user.id

  if (userId) {
    prefetchQuery(['fines.own', { userId, take: ITEMS_PER_PAGE, skip: 0 }])
  }
}
