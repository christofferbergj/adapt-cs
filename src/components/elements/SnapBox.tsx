import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Root = ({ children }: Props) => {
  return (
    <div className="relative w-full flex gap-4 snap-x snap-mandatory overflow-x-auto md:grid md:grid-cols-3 lg:gap-8 mt-4">
      {children}
    </div>
  )
}

const Item = ({ children }: Props) => {
  return (
    <div className="relative snap-center rounded border border-gray-6 px-5 py-8 bg-gray-2 flex flex-col items-center lg:p-8 shrink-0 w-4/5 md:w-full">
      {children}
    </div>
  )
}

const Title = ({ children }: Props) => {
  return <h3 className="font-bold text-lg truncate">{children}</h3>
}

export const SnapBox = Object.assign(Root, { Item, Title })
