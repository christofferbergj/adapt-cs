import type { FineType } from '@entities/fine-type/types'
import type { User } from '@entities/user/types'

export type Fine = {
  id: string
  createdAt: string
  updatedAt: string
  owner: User
  fineType: FineType
  isPaid: boolean
}
