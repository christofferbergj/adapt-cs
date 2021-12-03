import type { FineService } from '@application/ports'

import { createFine } from '@services/fine/createFine'
import { getFines } from '@services/fine/getFines'

export function useFineService(): FineService {
  return {
    createFine,
    getFines,
  }
}
