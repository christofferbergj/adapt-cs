import { type Fine } from '@domain/fine/index'

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