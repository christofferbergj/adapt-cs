import { type FineType } from '@domain/fine-type/entities'
import { type User } from '@domain/user/entities'

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
