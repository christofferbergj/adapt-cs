import * as Portal from '@radix-ui/react-portal'
import type { ReactNode } from 'react'
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion'

type Props = {
  children: ReactNode
}

export const NotificationList = ({ children }: Props) => {
  return (
    <Portal.Root>
      <AnimateSharedLayout>
        <ul
          aria-live="assertive"
          className="flex flex-col fixed z-50 bottom-0 right-0 m-4 gap-4"
        >
          <AnimatePresence initial={false}>{children}</AnimatePresence>
        </ul>
      </AnimateSharedLayout>
    </Portal.Root>
  )
}
