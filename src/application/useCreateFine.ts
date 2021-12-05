import { useMutation, useQueryClient } from 'react-query'

import { useFineAdapter } from '@adapters/fines'

export function useCreateFine() {
  const queryClient = useQueryClient()
  const { createFine, getFines } = useFineAdapter()

  return useMutation(createFine, {
    onSuccess: async () => {
      return await queryClient.prefetchQuery('fines', getFines)
    },
  })
}
