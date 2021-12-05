import { useCallback } from 'react'

import { useFineService } from '@services/fines'

export function useGetFines() {
  const { getFines } = useFineService()

  return useCallback(getFines, [getFines])
}
