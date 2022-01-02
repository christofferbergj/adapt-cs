import { type Fine } from '@app/fines'

/**
 * Check if a fine is paid
 *
 * @param fine - The fine to check
 *
 * @returns boolean
 */
export function isPaid(fine: Fine): boolean {
  return fine.isPaid
}
