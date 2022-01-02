import { trpc } from '@server/types'

export function useUsers() {
  const { data, ...rest } = trpc.useQuery(['users.all'])

  const users = data ?? []

  return {
    users,
    ...rest,
  }
}
