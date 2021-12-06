import { useQuery } from 'react-query'

import { useUsersAdapter } from '@adapters/users'

export function useUsers() {
  const { getUsers } = useUsersAdapter()
  const { data: users, ...rest } = useQuery('users', getUsers)

  return {
    users,
    ...rest,
  }
}
