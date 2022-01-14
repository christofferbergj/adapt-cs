import { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'button'>

export const Button = ({ children, ...rest }: Props) => {
  return <button {...rest}>{children}</button>
}
