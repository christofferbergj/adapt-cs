import type { UserAdapter } from '@application/ports'
import { getUsers } from '@features/user/adapters/getUsers'

export function useUsersAdapter(): UserAdapter {
  return {
    getUsers,
  }
}
