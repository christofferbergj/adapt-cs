import { GetResponseData } from '@api/fines'
import { Fine } from '@features/fine'

export const finesListTransformer = (
  fine: GetResponseData['fines'][number]
): Fine => {
  const { createdAt, fineType, id, owner, paid, updatedAt } = fine

  return {
    id,
    createdAt: createdAt.toString(),
    updatedAt: updatedAt.toString(),
    isPaid: paid,
    fineType: {
      id: fineType.id,
      price: fineType.price,
      title: fineType.title,
    },
    owner: {
      id: owner.id,
      name: owner.name ?? 'No owner',
      email: owner.email ?? 'No email',
      avatar: owner.image,
    },
  }
}
