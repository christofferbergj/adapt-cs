import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { PrismaClient } from '@prisma/client'
import { getSession } from 'next-auth/react'

declare global {
  var prisma: PrismaClient | undefined
}

const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  })

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

/**
 * Creates context for an incoming request
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

  return {
    prisma,
    req: opts?.req,
    res: opts?.res,
    user,
  }
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>
