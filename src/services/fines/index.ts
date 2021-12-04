import type { FineService } from '@application/ports'

import { createFine } from '@services/fines/createFine'
import { getFines } from '@services/fines/getFines'

export function useFineService(): FineService {
  return {
    createFine,
    getFines,
  }
}
