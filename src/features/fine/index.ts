import type { FineType } from '@features/fine-types'
import type { User } from '@features/user'

export type Fine = {
  id: string
  createdAt: string
  updatedAt: string
  owner: User
  fineType: FineType
  isPaid: boolean
}

export type CreateFine = {
  ownerId: Fine['owner']['id']
  fineTypeId: Fine['fineType']['id']
}
