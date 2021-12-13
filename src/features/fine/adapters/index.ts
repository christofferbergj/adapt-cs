import type { FineAdapter } from '@application/ports'

import { createFine } from '@features/fine/adapters/createFine'
import { getFine } from '@features/fine/adapters/getFine'
import { getFines } from '@features/fine/adapters/getFines'
import { getLeaders } from '@features/fine/adapters/getLeaders'
import { getMostPaidFines } from '@features/fine/adapters/getMostPaidFines'
import { getOwnFinesAdapter } from '@features/fine/adapters/getOwnFinesAdapter'

export function useFineAdapter(): FineAdapter {
  return {
    createFine,
    getFine,
    getFines,
    getLeaders,
    getMostPaidFines,
    getOwnFines: getOwnFinesAdapter,
  }
}
