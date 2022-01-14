import { hasAdminRole } from '@app/users/helpers/hasAdminRole'
import { useSession } from 'next-auth/react'

/**
 * Gets the user from the Next Auth Session
 *
 * @returns The user and meta data
 */
export function useUser() {
  const { data: session, ...rest } = useSession()

  const { user, ...restSession } = session ?? {}

  const isAdmin = !!user && hasAdminRole(user)

  return {
    user: session?.user,
    isAdmin,
    ...restSession,
    ...rest,
  }
}
