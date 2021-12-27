import Image from 'next/image'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import steffen from '/public/steffen.png'

type Props = {
  requireAdmin?: boolean
}

export const AuthGuard: NextPage<Props> = ({ requireAdmin, children }) => {
  const router = useRouter()
  const { data: session, status } = useSession()

  const isAdmin = session?.user.role === 'ADMIN'

  if (status === 'loading') {
    return null
  }

  if (requireAdmin && !isAdmin) {
    router.replace('/')

    return null
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Image
          alt="steffen"
          src={steffen}
          placeholder="blur"
          width={300}
          height={300}
        />

        <h1 className="mt-10 -ml-4 font-bold border border-purple-9 px-8 py-3 bg-purple-3">
          Not authenticated
        </h1>
      </div>
    )
  }

  return <>{children}</>
}
