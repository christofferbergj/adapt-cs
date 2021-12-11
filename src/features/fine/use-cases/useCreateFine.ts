import { useMutation, useQueryClient } from 'react-query'

import { useFineAdapter } from '@features/fine/adapters'

export function useCreateFine() {
  const queryClient = useQueryClient()
  const { createFine, getFines } = useFineAdapter()

  return useMutation(createFine, {
    onSuccess: async () => {
      return await queryClient.prefetchQuery('fines', () => getFines())
    },
  })
}
