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
    <div className="hidden items-center lg:gap-8 lg:flex p-5 bg-gray-2 border-b border-gray-6 font-bold">
      {children}
    </div>
  )
}

const Row = ({ children }: Props) => {
  return (
    <div className="items-center lg:gap-8 lg:flex p-5 border-b border-gray-6 min-h-[81px] font-medium divide-y divide-dashed divide-gray-6 lg:divide-none">
      {children}
    </div>
  )
}

const Name = ({ children }: Props) => {
  return (
    <div className="flex pb-2 sm:pb-3 lg:pb-0 items-center gap-3 basis-52 text-lg lg:text-sm">
      {children}
    </div>
  )
}

const Fee = ({ children }: Props) => {
  return <div className="py-2 sm:py-3 lg:py-0 basis-36">{children}</div>
}

const Date = ({ children }: Props) => {
  return <div className="py-2 sm:py-3 lg:py-0 basis-36">{children}</div>
}

const Price = ({ children }: Props) => {
  return <div className="py-2 sm:py-3 lg:py-0 flex-1">{children}</div>
}

const Status = ({ children }: Props) => {
  return (
    <div className="flex items-center gap-2 flex-1 pt-4 lg:pt-0">
      {children}
    </div>
  )
}

export const Overview = Object.assign(Root, {
  Date,
  Fee,
  Header,
  Name,
  Price,
  Row,
  Status,
})
