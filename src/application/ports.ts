import type { CreateFine, Fine } from '@entities/../features/fine/entities/types'
import type { FineType } from '@entities/../features/fine-types/entities/types'
import type { User } from '@entities/../features/user/entities/types'

export interface FineAdapter {
  createFine(payload: CreateFine): Promise<Fine | null>
  getFines(): Promise<Fine[]>
  // deleteFine(id: Fine['id']): Promise<Fine>
  getFine(id: Fine['id']): Promise<Fine | null>
  // updateFine(id: Fine['id'], payload: Partial<Fine>): Promise<Fine>
}

export interface FineTypeAdapter {
  getFineTypes(): Promise<FineType[]>
}

export interface UserAdapter {
  getUsers(): Promise<User[]>
}
