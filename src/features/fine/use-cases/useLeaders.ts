import { useQuery } from 'react-query'

import { getLeaders } from '@features/fine/adapters/getLeaders'
import { queryKeys } from '@config/constants'

export function useLeaders() {
  const { data: leaders, ...rest } = useQuery(queryKeys.leaders, getLeaders)

  return {
    leaders,
    ...rest,
  }
}
