import type { Fine } from '@entities/fine/types'

type CreateFinePayload = {
  ownerId: Pick<Fine['owner'], 'id'>
  fineTypeId: Pick<Fine['fineType'], 'id'>
}

export interface FineService {
  createFine(payload: CreateFinePayload): Promise<Fine | null>
  getFines(): Promise<Fine[]>
  // deleteFine(id: Fine['id']): Promise<Fine>
  getFine(id: Fine['id']): Promise<Fine | null>
  // updateFine(id: Fine['id'], payload: Partial<Fine>): Promise<Fine>
}
