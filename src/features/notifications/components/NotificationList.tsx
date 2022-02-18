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
          className="fixed top-0 right-0 z-50 m-4 flex flex-col gap-4 lg:m-8"
        >
          <AnimatePresence initial={false}>{children}</AnimatePresence>
        </ul>
      </AnimateSharedLayout>
    </Portal.Root>
  )
}
