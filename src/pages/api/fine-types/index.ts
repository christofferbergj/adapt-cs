import nc from 'next-connect'
import type Prisma from '@prisma/client'

import { apiHandler } from '@utils/apiHandler'
import { prisma } from '@lib/prisma'

export type GetResponseData = {
  fineTypes: Prisma.FineType[]
}

const fineTypesHandler = nc(apiHandler)

fineTypesHandler.get<void, GetResponseData>(async (req, res) => {
  try {
    res.fineTypes = await prisma.fineType.findMany({})

    res.json(res.fineTypes)
  } finally {
    await prisma.$disconnect()
  }
})

export default fineTypesHandler
