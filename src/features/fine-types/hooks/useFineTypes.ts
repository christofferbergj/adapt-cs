import { trpc } from '@utils/trpc'

export function useFineTypes() {
  const { data, ...rest } = trpc.useQuery(['fineTypes.all'])

  const fineTypes = data ?? []

  return {
    fineTypes,
    ...rest,
  }
}
