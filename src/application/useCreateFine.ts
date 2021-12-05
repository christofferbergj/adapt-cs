import { useCallback } from 'react'

import { useFineService } from '@services/fines'
import { FineService } from '@application/ports'

export function useCreateFine(payload: Parameters<FineService['createFine']>) {
  const { createFine } = useFineService()

  const notificationMock = (message: string) => window.prompt(message)

  const fn = async () => {
    try {
      await createFine(...payload)

      notificationMock('Successfully created fine')
    } catch (e) {
      notificationMock('Error occurred')
    }
  }

  return useCallback(fn, [createFine, payload])
}
