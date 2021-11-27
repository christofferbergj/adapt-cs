import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const Button = ({ children }: Props) => {
  return <button>{children}</button>
}
