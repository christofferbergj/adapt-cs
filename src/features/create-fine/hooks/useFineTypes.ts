import { trpc } from '@server/types'

export function useFineTypes() {
  const { data, ...rest } = trpc.useQuery(['fineTypes.all'])

  const fineTypes = data ?? []

  return {
    fineTypes,
    ...rest,
  }
}
