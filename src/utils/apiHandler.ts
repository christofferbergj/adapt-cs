import type { NextApiRequest, NextApiResponse } from 'next'
import { Options } from 'next-connect'

import { getErrorMessage } from '@utils/getErrorMessage'

export const apiHandler: Options<NextApiRequest, NextApiResponse> = {
  onError: (err: unknown, req, res) => {
    const message = getErrorMessage(err)
    res.status(500).end(message)
  },
  onNoMatch: (req, res) => {
    res.status(405).send(`Method ${req.method} Not Allowed`)
  },
}
