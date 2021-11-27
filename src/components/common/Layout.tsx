import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col mx-auto min-h-screen bg-gray-50">
      <main className="p-10">{children}</main>
    </div>
  )
}
