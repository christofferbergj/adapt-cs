import type { ReactNode } from 'react'

import { useSession } from 'next-auth/react'

import { Container } from '@components/layout/Container'
import { Header } from '@components/common/Header'

type Props = {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {
  const { status } = useSession()

  return (
    <div className="flex flex-col mx-auto min-h-screen bg-gray-50">
      <Header />

      {status === 'loading' ? (
        <Container>
          <p>Loading app...</p>
        </Container>
      ) : (
        <main>{children}</main>
      )}
    </div>
  )
}
