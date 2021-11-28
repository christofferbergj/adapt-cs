import type { ReactNode } from 'react'

import { useSession } from 'next-auth/react'

import { Header } from '@components/common/Header'

type Props = {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {
  const { status } = useSession()

  if (status === 'loading') return <p>Loading app..</p>

  return (
    <div className="flex flex-col mx-auto min-h-screen bg-gray-50">
      <Header />
      <main>{children}</main>
    </div>
  )
}
