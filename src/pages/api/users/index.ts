import nc from 'next-connect'
import type Prisma from '@prisma/client'

import { apiHandler } from '@utils/apiHandler'
import { prisma } from '@lib/prisma'
import { getSession } from 'next-auth/react'

export type GetResponseData = {
  users: Prisma.User[]
}

const usersHandler = nc(apiHandler)

usersHandler.get<void, GetResponseData>(async (req, res) => {
  const session = await getSession({ req })

  if (!session) {
    res.status(401).json({ message: 'Not authenticated' })
  }

  try {
    res.users = await prisma.user.findMany()

    res.json(res.users)
  } finally {
    prisma.$disconnect()
  }
})

export default usersHandler
