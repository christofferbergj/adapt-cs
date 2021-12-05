import nc from 'next-connect'
import type Prisma from '@prisma/client'

import { apiHandler } from '@utils/apiHandler'
import { prisma } from '@lib/prisma'

type Fine = Prisma.Fine & { owner: Prisma.User; fineType: Prisma.FineType }

export type ResponseData = {
  fine: Fine | null
}

const handler = nc(apiHandler)

handler.get<void, ResponseData>(async (req, res) => {
  const id = (req.query.id as string) || '-1'

  try {
    res.fine = await prisma.fine.findUnique({
      where: {
        id,
      },
      include: {
        owner: true,
        fineType: true,
      },
    })

    res.json(res.fine)
  } finally {
    prisma.$disconnect()
  }
})

export default handler
