import type { FineType } from '@features/fine-types/entities'
import type { User } from '@features/user/entities'

export type Fine = {
  id: string
  createdAt: string
  updatedAt: string
  owner: User
  fineType: FineType
  isPaid: boolean
}

export type FineList = {
  fines: Fine[]
  count: number
}

export type CreateFine = {
  ownerId: Fine['owner']['id']
  fineTypeId: Fine['fineType']['id']
}

export type MostPaidFine = {
  id: string
  title: string
  paidTimes: number
}

export type FineLeader = {
  id: string
  name: string
  avatar: string | null
  totalPaid: number
  totalFines: number
}
