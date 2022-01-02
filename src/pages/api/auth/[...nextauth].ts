import { NextApiHandler } from 'next'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import invariant from 'tiny-invariant'
import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'

import { prisma } from '@lib/prisma'
import { userTransformer } from '@app/users/user.transformer'

const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async signIn({ profile, account }) {
      if (account.provider === 'google') {
        return !!profile.email?.endsWith('@adaptagency.com')
      }

      return true
    },
    async session({ session, user }) {
      const dbUser = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
      })

      invariant(dbUser, 'User does not exist')
      session.user = userTransformer(dbUser)

      return session
    },
  },
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)

export default authHandler
