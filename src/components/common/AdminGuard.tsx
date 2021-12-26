import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

export const AdminGuard: NextPage = ({ children }) => {
  const router = useRouter()
  const { data: session, status } = useSession()

  const isAdmin = session?.user.role === 'ADMIN'

  if (status === 'loading') {
    return null
  }

  if (!isAdmin) {
    router.replace('/')

    return null
  }

  return <>{children}</>
}
