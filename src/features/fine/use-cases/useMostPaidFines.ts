import ms from 'ms'
import { useQuery } from 'react-query'

import { getMostPaidFines } from '@features/fine/adapters/getMostPaidFines'
import { queryKeys } from '@config/constants'

export function useMostPaidFines() {
  const { data: mostPaidFines, ...rest } = useQuery(
    queryKeys.mostPaidFines,
    getMostPaidFines,
    {
      staleTime: ms('60s'),
    }
  )

  return {
    mostPaidFines,
    ...rest,
  }
}
