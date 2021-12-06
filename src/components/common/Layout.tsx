import type { ReactNode } from 'react'

import { Header } from '@components/common/Header'

type Props = {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full">{children}</main>
    </div>
  )
}
