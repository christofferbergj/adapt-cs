import { useQuery } from 'react-query'

import { useUsersService } from '@adapters/users'

export function useUsers() {
  const { getUsers } = useUsersService()
  const { data: users, ...rest } = useQuery('users', getUsers)

  return {
    users,
    ...rest,
  }
}
