import { useQuery } from 'react-query'

import { useFineTypeAdapter } from '@features/fine-types/adapters'

export function useFineTypes() {
  const { getFineTypes } = useFineTypeAdapter()
  const { data: fineTypes, ...rest } = useQuery('fine-types', getFineTypes)

  return {
    fineTypes,
    ...rest,
  }
}
