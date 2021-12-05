import nc from 'next-connect'
import type Prisma from '@prisma/client'

import { apiHandler } from '@utils/apiHandler'
import { prisma } from '@lib/prisma'

export type GetResponseData = {
  fines: (Prisma.Fine & {
    owner: Prisma.User
    fineType: Prisma.FineType
  })[]
}

export type PostResponseData = {
  fine: Prisma.Fine & { owner: Prisma.User; fineType: Prisma.FineType }
}

const handler = nc(apiHandler)

handler
  .get<void, GetResponseData>(async (req, res) => {
    try {
      res.fines = await prisma.fine.findMany({
        include: {
          owner: true,
          fineType: true,
        },
      })

      res.json(res.fines)
    } finally {
      prisma.$disconnect()
    }
  })
  .post<void, PostResponseData>(async (req, res) => {
    const { body } = req

    try {
      res.fine = await prisma.fine.create({
        data: {
          fineType: {
            connect: {
              id: body.fineTypeId || '',
            },
          },
          owner: {
            connect: {
              id: body.ownerId || '',
            },
          },
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
