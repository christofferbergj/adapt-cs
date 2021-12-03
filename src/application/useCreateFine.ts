import type { Fine } from '@entities/fine/types'
import { useFineService } from '@services/fine'

export function useCreateFine() {
  const fineService = useFineService()

  const createFine = async (fine: Fine): Promise<Fine | null> => {
    return await fineService.createFine(fine)
  }

  return { createFine }
}
