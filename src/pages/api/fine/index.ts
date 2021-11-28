import type { NextApiRequest, NextApiResponse } from 'next'

import { getSession } from 'next-auth/react'

import { prisma } from '@lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  if (!session) {
    res.status(400).json({ message: 'Not authenticated' })
  }

  const result = await prisma.fine.create({
    data: {
      ...req.body,
    },
  })

  res.status(200).json(result)
}

export default handler
