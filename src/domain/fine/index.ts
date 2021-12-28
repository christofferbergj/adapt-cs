import type { User } from '@domain/user'

export type Fine = {
  id: string
  createdAt: string
  updatedAt: string
  owner: User
  title: string
  price: number
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
