import type { Fine, User, FineType } from '.prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { prisma } from '@lib/prisma'

type Response = (Fine & { owner: User; fineType: FineType })[]
type Error = { message: string }

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Response | Error>
) => {
  const session = await getSession({ req })

  console.log('______________session', session)

  //
  // if (!session) {
  //   res.status(400).json({ message: 'Not authenticated' })
  // }

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
}

export default handler
