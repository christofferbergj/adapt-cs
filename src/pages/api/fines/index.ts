import type Prisma from '.prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@lib/prisma'

type Response = (Prisma.Fine & {
  owner: Prisma.User
  fineType: Prisma.FineType
})[]

type Error = { message: string }

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Response | Error>
) => {
  const { method } = req

  if (method === 'GET') {
    try {
      const response = await prisma.fine.findMany({
        include: {
          owner: true,
          fineType: true,
        },
      })

      res.status(200).json(response)
    } catch (e) {
      res.status(500).json({ message: 'Error occurred' })
    } finally {
      prisma.$disconnect()
    }
  } else {
    // Default
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default handler
