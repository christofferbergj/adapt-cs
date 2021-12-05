import type { UserAdapter } from '@application/ports'
import { getUsers } from '@adapters/users/getUsers'

export function useUsersService(): UserAdapter {
  return {
    getUsers,
  }
}
