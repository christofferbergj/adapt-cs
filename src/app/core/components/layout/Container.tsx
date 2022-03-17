import { ReactNode } from 'react'
import clsx from 'clsx'

type Props = {
  className?: string
  children: ReactNode
  size?: 'md' | 'lg'
}

export const Container = ({ className, children, size = 'lg' }: Props) => {
  return (
    <div
      className={clsx(
        'content-box mx-auto w-full px-5 md:px-10 xl:px-5',
        {
          'max-w-screen-md': size === 'md',
          'max-w-screen-lg': size === 'lg',
        },
        className
      )}
    >
      {children}
    </div>
  )
}
