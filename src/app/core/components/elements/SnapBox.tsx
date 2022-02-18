import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Root = ({ children }: Props) => {
  return (
    <div className="relative mt-4 flex w-full snap-x snap-mandatory gap-4 overflow-x-auto md:grid md:grid-cols-3 lg:gap-8">
      {children}
    </div>
  )
}

const Item = ({ children }: Props) => {
  return (
    <div className="relative flex w-4/5 shrink-0 snap-center flex-col items-center justify-center rounded border border-gray-6 bg-gray-2 px-5 py-8 md:w-full lg:p-8">
      {children}
    </div>
  )
}

const Title = ({ children }: Props) => {
  return <h3 className="text-center text-lg font-bold">{children}</h3>
}

export const SnapBox = Object.assign(Root, { Item, Title })
