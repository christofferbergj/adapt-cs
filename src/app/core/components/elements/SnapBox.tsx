import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Root = ({ children }: Props) => {
  return (
    <div className="flex overflow-x-auto relative gap-4 mt-4 w-full snap-x snap-mandatory md:grid md:grid-cols-3 lg:gap-8">
      {children}
    </div>
  )
}

const Item = ({ children }: Props) => {
  return (
    <div className="flex relative flex-col justify-center items-center px-5 py-8 w-4/5 rounded border snap-center border-gray-6 bg-gray-2 lg:p-8 shrink-0 md:w-full">
      {children}
    </div>
  )
}

const Title = ({ children }: Props) => {
  return <h3 className="text-lg font-bold text-center">{children}</h3>
}

export const SnapBox = Object.assign(Root, { Item, Title })
