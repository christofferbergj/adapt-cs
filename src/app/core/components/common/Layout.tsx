import type { ReactNode } from 'react'

import { Footer } from '@app/core/components/common/Footer'
import { Header } from '@app/core/components/common/Header'
import { Notifications } from '@features/notifications/components/Notifications'

type Props = {
  children: ReactNode
}

export const Root = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="relative z-10 w-full flex-1">{children}</main>
      <Footer />

      <Notifications />
    </div>
  )
}

export const Space = ({ children }: Props) => {
  return <div className="py-10 lg:py-16">{children}</div>
}

export const Layout = Object.assign(Root, { Space })
