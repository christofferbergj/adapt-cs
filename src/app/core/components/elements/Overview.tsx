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
        'relative flex flex-col text-sm border border-gray-6 rounded-lg overflow-hidden bg-gray-1',
        className
      )}
    >
      {children}
    </div>
  )
}

const Header = ({ children }: Props) => {
  return (
    <div className="hidden grid-cols-[1.5fr,1.5fr,1fr,1fr,1fr,1fr] items-center p-5 font-bold border-b lg:gap-8 lg:grid bg-gray-2 border-gray-6">
      {children}
    </div>
  )
}

const Row = ({ children }: Props) => {
  return (
    <div className="items-center lg:gap-8 lg:grid grid-cols-[1.5fr,1.5fr,1fr,1fr,1fr,1fr] p-5 border-b border-gray-6 min-h-[81px] font-medium divide-y divide-dashed divide-gray-6 lg:divide-none">
      {children}
    </div>
  )
}

const Name = ({ children }: Props) => {
  return (
    <div className="flex gap-3 items-center pb-2 text-lg sm:pb-3 lg:pb-0 lg:text-sm">
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
