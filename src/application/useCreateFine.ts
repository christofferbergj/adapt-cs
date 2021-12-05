import { useCallback } from 'react'

import type { CreateFinePayload } from '@application/ports'
import { useFineService } from '@services/fines'

export function useCreateFine() {
  const { createFine } = useFineService()

  const fn = async (payload: CreateFinePayload) => {
    try {
      await createFine(payload)

      console.log('Successfully created fine')
    } catch (error) {
      console.error(error)
    }
  }

  return useCallback(fn, [createFine])
}
