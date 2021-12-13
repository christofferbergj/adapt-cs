import { ReactNode } from 'react'
import clsx from 'clsx'

type Props = {
  className?: string
  children: ReactNode
}

export const Container = ({ className, children }: Props) => {
  return (
    <div
      className={clsx(
        'content-box mx-auto px-5 md:px-10 xl:px-5 w-full max-w-screen-lg',
        className
      )}
    >
      {children}
    </div>
  )
}
