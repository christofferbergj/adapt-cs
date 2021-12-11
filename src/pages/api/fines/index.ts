import nc from 'next-connect'
import type Prisma from '@prisma/client'
import { getSession } from 'next-auth/react'

import { apiHandler } from '@utils/apiHandler'
import { prisma } from '@lib/prisma'

export type GetResponseData = {
  count: number
  fines: (Prisma.Fine & {
    owner: Prisma.User
    fineType: Prisma.FineType
  })[]
}

export type PostResponseData = {
  fine: Prisma.Fine & { owner: Prisma.User; fineType: Prisma.FineType }
}

const finesHandler = nc(apiHandler)

finesHandler
  .get(async (req, res) => {
    try {
      const [count, fines] = await prisma.$transaction([
        prisma.fine.count(),
        prisma.fine.findMany({
          take: Number(req.query.take) || 5,
          skip: Number(req.query.skip) || undefined,
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

      res.json(response)
    } finally {
      await prisma.$disconnect()
    }
  })
  .post<void, PostResponseData>(async (req, res) => {
    const { body } = req
    const session = await getSession({ req })

    if (session?.user?.email !== 'christoffer.berg@adaptagency.com') {
      res.status(401).json({ message: 'Not admin' })
    }

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

export default finesHandler
