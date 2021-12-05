import type { FineAdapter } from '@application/ports'

import { createFine } from './createFine'
import { getFine } from './getFine'
import { getFines } from './getFines'

export function useFineAdapter(): FineAdapter {
  return {
    createFine,
    getFines,
    getFine,
  }
}
