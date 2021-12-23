import type {
  CreateFine,
  Fine,
  FineLeader,
  MostPaidFine,
} from '@features/fine/entities'
import type { FineType } from '@features/fine-types'
import type { User } from '@features/user'
import { AsyncReturnType } from 'type-fest'

export interface FineAdapter {
  createFine(payload: CreateFine): Promise<Fine | null>
  getFines(params?: {
    skip?: number
    take?: number
  }): Promise<{ fines: Fine[]; count: number }>
  getOwnFines(params?: {
    skip?: number
    take?: number
    userId?: string
  }): Promise<{ fines: Fine[]; count: number }>
  getMostPaidFines(): Promise<MostPaidFine[]>
  getLeaders(): Promise<FineLeader[]>
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

type Lol = ReturnType<FineAdapter['getFines']>
type Lol2 = AsyncReturnType<FineAdapter['getFines']>
