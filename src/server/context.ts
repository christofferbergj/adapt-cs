import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { getSession } from 'next-auth/react'

import { hasAdminRole } from '@app/users/helpers/hasAdminRole'
import { prisma } from '@lib/prisma'

/**
 * Creates context for an incoming request
 *
 * @link https://trpc.io/docs/context
 */
export const createContext = async (
  opts?: trpcNext.CreateNextContextOptions
) => {
  async function getUserFromSession() {
    const session = await getSession({ req: opts?.req })

    return session ? session.user : null
  }

  const user = await getUserFromSession()
  const isAdmin = user && hasAdminRole(user)

  return {
    prisma,
    req: opts?.req,
    res: opts?.res,
    user,
    isAdmin,
  }
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>
