import { useQuery } from 'react-query'

import { useFineAdapter } from '@features/fine/adapters'

export function useFines() {
  const { getFines } = useFineAdapter()
  const { data: fines, ...rest } = useQuery('fines', getFines)

  return {
    fines,
    ...rest,
  }
}
