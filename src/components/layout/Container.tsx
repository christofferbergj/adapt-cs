import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const Container = ({ children }: Props) => {
  return (
    <div className="content-box mx-auto px-5 w-full max-w-screen-lg">
      {children}
    </div>
  )
}
