import type { Fine } from '@entities/fine/types'

export interface FineService {
  createFine(fine: Omit<Fine, 'id'>): Promise<Fine>
  getFines(): Promise<Fine[]>
  // deleteFine(id: Fine['id']): Promise<Fine>
  // getFine(id: Fine['id']): Promise<Fine>
  // updateFine(id: Fine['id'], payload: Partial<Fine>): Promise<Fine>
}
