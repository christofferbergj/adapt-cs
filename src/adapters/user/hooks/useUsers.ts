import { trpc } from '@utils/trpc'

export function useUsers() {
  const { data, ...rest } = trpc.useQuery(['users.all'])

  const users = data ?? []

  return {
    users,
    ...rest,
  }
}
