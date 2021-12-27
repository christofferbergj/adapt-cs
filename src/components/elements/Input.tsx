import type { InputHTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react'
import { forwardRef } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement>

const Root = ({ children }: { children: ReactNode }) => {
  return <>{children}</>
}

const Wrapper = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-2">{children}</div>
}

const Label = ({
  children,
  ...rest
}: LabelHTMLAttributes<HTMLLabelElement> & { children: ReactNode }) => {
  return (
    <label className="text-sm font-semibold" {...rest}>
      {children}
    </label>
  )
}

const Element = forwardRef<HTMLInputElement, Props>(({ ...rest }, ref) => {
  return (
    <input
      ref={ref}
      className="px-4 py-2 w-full font-medium rounded border outline-none bg-gray-3 hover:bg-gray-4 focus:bg-gray-5 border-gray-7 focus:gray-8 placeholder:text-sm placeholder:text-gray-9"
      {...rest}
    />
  )
})

Element.displayName = 'Input element'

export const Input = Object.assign(Root, {
  Element,
  Label,
  Wrapper,
})
