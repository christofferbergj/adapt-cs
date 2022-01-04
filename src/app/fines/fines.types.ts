import type { User } from '@app/users'

export type FineStatus = 'pending' | 'paid' | 'unpaid'

export type Fine = {
  id: string
  createdAt: string
  updatedAt: string
  owner: User
  title: string
  price: number
  isPaid: boolean
  status: FineStatus
}

export type FineList = {
  fines: Fine[]
  count: number
}

export type MostPaidFine = {
  id: string
  title: string
  paidTimes: number
  sum: number
}

export type FineLeader = {
  id: string
  name: string
  avatar: string | null
  totalPaid: number
  totalFines: number
}
