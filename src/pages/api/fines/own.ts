import nc from 'next-connect'
import type Prisma from '@prisma/client'
import { getSession } from 'next-auth/react'

import { apiHandler } from '@utils/apiHandler'
import { getOwnFinesQuery } from '@features/fine/server/getOwnFinesQuery'

export type GetResponseData = {
  count: number
  fines: (Prisma.Fine & {
    owner: Prisma.User
    fineType: Prisma.FineType
  })[]
}

const ownFinesHandler = nc(apiHandler)

ownFinesHandler.get(async (req, res) => {
  const session = await getSession({ req })

  if (!session) {
    res.status(401)
    res.end()

    return
  }

  try {
    const response = await getOwnFinesQuery({
      userId: session.user.id,
      take: Number(req.query.take) || 10,
      skip: Number(req.query.skip) || undefined,
    })

    res.json(response)
  } catch (e) {
    res.json(e)
  }
})

export default ownFinesHandler
