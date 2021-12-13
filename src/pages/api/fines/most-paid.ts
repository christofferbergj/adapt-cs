import nc from 'next-connect'

import { apiHandler } from '@utils/apiHandler'
import { prisma } from '@lib/prisma'

const mostPaidHandler = nc(apiHandler)

mostPaidHandler.get(async (req, res) => {
  try {
    const response = await prisma.fineType.findMany({
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
    })

    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

export default mostPaidHandler
