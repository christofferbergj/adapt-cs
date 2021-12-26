import type Prisma from '@prisma/client'
import type { User } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
    user: User & {
      /** The user's role. */
      role: Prisma.User['role']
    }
  }
}
