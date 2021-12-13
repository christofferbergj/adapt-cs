import type { ReactNode } from 'react'

import { Footer } from '@components/common/Footer'
import { Header } from '@components/common/Header'

type Props = {
  children: ReactNode
}

export const Root = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="relative z-10 flex-1 w-full">{children}</main>
      <Footer />
    </div>
  )
}

export const Space = ({ children }: Props) => {
  return (
    <div className="py-10 md:py-16 flex flex-col gap-16 md:gap-24">
      {children}
    </div>
  )
}

export const Layout = Object.assign(Root, { Space })
