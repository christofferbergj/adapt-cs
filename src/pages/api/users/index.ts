import nc from 'next-connect'
import type Prisma from '@prisma/client'

import { apiHandler } from '@utils/apiHandler'
import { prisma } from '@lib/prisma'

export type GetResponseData = {
  users: Prisma.User[]
}

const usersHandler = nc(apiHandler)

usersHandler.get<void, GetResponseData>(async (req, res) => {
  try {
    res.users = await prisma.user.findMany()

    res.json(res.users)
  } finally {
    prisma.$disconnect()
  }
})

export default usersHandler
