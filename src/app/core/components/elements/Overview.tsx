import { ReactNode } from 'react'
import clsx from 'clsx'

type Props = {
  children: ReactNode
  className?: string
}

const Root = ({ children, className }: Props) => {
  return (
    <div
      className={clsx(
        'relative flex flex-col overflow-hidden rounded-lg border border-gray-6 bg-gray-1 text-sm',
        className
      )}
    >
      {children}
    </div>
  )
}

const Header = ({ children }: Props) => {
  return (
    <div className="hidden grid-cols-[1.5fr,1.5fr,1fr,1fr,1fr,1fr] items-center border-b border-gray-6 bg-gray-2 p-5 font-bold lg:grid lg:gap-8">
      {children}
    </div>
  )
}

const Row = ({ children }: Props) => {
  return (
    <div className="min-h-[81px] grid-cols-[1.5fr,1.5fr,1fr,1fr,1fr,1fr] items-center divide-y divide-dashed divide-gray-6 border-b border-gray-6 p-5 font-medium lg:grid lg:gap-8 lg:divide-none">
      {children}
    </div>
  )
}

const Name = ({ children }: Props) => {
  return (
    <div className="flex items-center gap-3 pb-2 text-lg sm:pb-3 lg:pb-0 lg:text-sm">
      {children}
    </div>
  )
}

const Fee = ({ children }: Props) => {
  return <div className="py-2 sm:py-3 lg:py-0">{children}</div>
}

const Date = ({ children }: Props) => {
  return <div className="py-2 sm:py-3 lg:py-0">{children}</div>
}

const Price = ({ children }: Props) => {
  return <div className="flex-1 py-2 sm:py-3 lg:py-0">{children}</div>
}

const Status = ({ children }: Props) => {
  return <div className="py-2 sm:py-3 lg:py-0">{children}</div>
}

const Actions = ({ children }: Props) => {
  return <div className="py-2 sm:py-3 lg:py-0">{children}</div>
}

export const Overview = Object.assign(Root, {
  Date,
  Fee,
  Header,
  Name,
  Price,
  Row,
  Status,
  Actions,
})
