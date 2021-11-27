import { NextApiHandler } from 'next'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
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
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)

export default authHandler
