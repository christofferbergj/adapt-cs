import nc from 'next-connect'
import type Prisma from '@prisma/client'

import { apiHandler } from '@utils/apiHandler'
import { prisma } from '@lib/prisma'

export type GetResponseData = {
  leaders: (Prisma.User & {
    fines: { fineType: { price: number } }[]
    _count: { fines: number }
  })[]
}

const leadersHandler = nc(apiHandler)

leadersHandler.get(async (req, res) => {
  try {
    const result = await prisma.user.findMany({
      include: {
        fines: {
          select: {
            fineType: {
              select: {
                price: true,
              },
            },
          },
        },
        _count: {
          select: {
            fines: true,
          },
        },
      },
      orderBy: {
        fines: {
          _count: 'desc',
        },
      },
      take: 6,
    })

    const response: GetResponseData = {
      leaders: result,
    }

    res.json(response)
  } catch (error) {
    console.log(error)
  } finally {
    await prisma.$disconnect()
  }
})

export default leadersHandler
