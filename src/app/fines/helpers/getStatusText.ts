import { Fine } from '@app/fines'

/**
 * Get the status text of a fine
 *
 * @param status The fine status
 *
 * @returns The status text
 */
export const getStatusText = (status: Fine['status']) => {
  switch (status) {
    case 'pending':
      return 'Afventer godkendelse'
    case 'paid':
      return 'Betalt'
    case 'unpaid':
      return 'Ikke betalt'

    default:
      null
  }
}
