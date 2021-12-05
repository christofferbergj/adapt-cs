import type { FineService } from '@application/ports'

import { createFine } from './createFine'
import { getFine } from './getFine'
import { getFines } from './getFines'

export function useFineService(): FineService {
  return {
    createFine,
    getFines,
    getFine,
  }
}
