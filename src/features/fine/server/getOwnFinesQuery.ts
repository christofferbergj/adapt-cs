import { GetResponseData } from '@api/fines/own'
import { prisma } from '@lib/prisma'

type Params = {
  userId: string
  take?: number
  skip?: number
}

export async function getOwnFinesQuery({ userId, skip, take }: Params) {
  try {
    const [count, fines] = await prisma.$transaction([
      prisma.fine.count({
        where: {
          ownerId: userId,
        },
      }),
      prisma.fine.findMany({
        take: Number(take) || 10,
        skip: Number(skip) || undefined,
        where: {
          ownerId: userId,
        },
        include: {
          owner: true,
          fineType: true,
        },
        orderBy: [{ paid: 'asc' }, { createdAt: 'desc' }],
      }),
    ])

    const response: GetResponseData = {
      fines,
      count,
    }

    return response
  } finally {
    await prisma.$disconnect()
  }
}
