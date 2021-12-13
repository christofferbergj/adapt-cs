import Prisma from '@prisma/client'
import nc from 'next-connect'

import { apiHandler } from '@utils/apiHandler'
import { prisma } from '@lib/prisma'

export type GetResponseData = {
  fines: (Prisma.FineType & {
    _count: { fines: number }
  })[]
}

const mostPaidHandler = nc(apiHandler)

mostPaidHandler.get(async (req, res) => {
  try {
    const result = await prisma.fineType.findMany({
      include: {
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
      take: 3,
    })

    const response: GetResponseData = {
      fines: result,
    }

    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

export default mostPaidHandler
