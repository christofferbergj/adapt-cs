import type { NextApiRequest, NextApiResponse } from 'next'
import { getErrorMessage } from '@utils/getErrorMessage'

export const apiHandler = {
  onError: (err: unknown, req: NextApiRequest, res: NextApiResponse) => {
    const message = getErrorMessage(err)
    res.status(500).end(message)
  },
  onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
    res.status(405).send(`Method ${req.method} Not Allowed`)
  },
}
