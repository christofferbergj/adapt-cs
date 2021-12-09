import type { FineTypeAdapter } from '@application/ports'
import { getFineTypes } from '@features/fine-types/adapters/getFineTypes'

export function useFineTypeAdapter(): FineTypeAdapter {
  return {
    getFineTypes,
  }
}
