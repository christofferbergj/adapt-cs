import { trpc } from '@utils/trpc'

export function useLeaders() {
  const { data, ...rest } = trpc.useQuery(['fines.leaders'])

  const leaders = data ?? []

  return {
    leaders,
    ...rest,
  }
}
