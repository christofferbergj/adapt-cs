import { NextApiHandler } from 'next'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import invariant from 'tiny-invariant'
import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'

import { prisma } from '@lib/prisma'

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
    async signIn({ user }) {
      return !!user.email?.endsWith('adaptagency.com')
    },
    // async session({ session, user }) {
    //   const prismaUser = await prisma.user.findUnique({
    //     where: {
    //       id: user.id,
    //     },
    //   })
    //
    //   invariant(prismaUser, 'User does not exist')
    //
    //   session.user = prismaUser
    //
    //   return session
    // },
  },
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)

export default authHandler
