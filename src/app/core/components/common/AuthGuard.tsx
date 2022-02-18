import Image from 'next/image'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'

import { hasAdminRole } from '@app/users/helpers/hasAdminRole'

import steffen from '/public/steffen.png'
import { Layout } from '@app/core/components/common/Layout'

type Props = {
  requireAdmin?: boolean
}

export const AuthGuard: NextPage<Props> = ({ requireAdmin, children }) => {
  const { data: session, status } = useSession()
  const user = session?.user
  const isAdmin = user && hasAdminRole(user)

  if (status === 'loading') {
    return null
  }

  if (!session || (requireAdmin && !isAdmin)) {
    return (
      <Layout>
        <Layout.Space>
          <div className="flex flex-col items-center justify-center">
            <Image
              alt="steffen"
              src={steffen}
              placeholder="blur"
              width={240}
              height={240}
            />

            <h1 className="mt-10 -ml-4 border border-purple-9 bg-purple-3 px-8 py-3 font-bold">
              Not authenticated
            </h1>
          </div>
        </Layout.Space>
      </Layout>
    )
  }

  return <>{children}</>
}
