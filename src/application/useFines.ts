import { useQuery } from 'react-query'

import { useFineAdapter } from '@adapters/fines'

export function useFines() {
  const { getFines } = useFineAdapter()
  const { data: fines, ...rest } = useQuery('fines', getFines)

  return {
    fines,
    ...rest,
  }
}
