import type { ReactNode } from 'react'

import { Header } from '@components/common/Header'

type Props = {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col mx-auto min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  )
}
