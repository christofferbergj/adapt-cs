import type { CreateFine, Fine } from '@entities/fine/types'
import type { User } from '@entities/user/types'

export interface FineAdapter {
  createFine(payload: CreateFine): Promise<Fine | null>
  getFines(): Promise<Fine[]>
  // deleteFine(id: Fine['id']): Promise<Fine>
  getFine(id: Fine['id']): Promise<Fine | null>
  // updateFine(id: Fine['id'], payload: Partial<Fine>): Promise<Fine>
}

export interface UserAdapter {
  getUsers(): Promise<User[]>
}
