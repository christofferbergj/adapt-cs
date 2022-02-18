import clsx from 'clsx'
import { Cross2Icon } from '@radix-ui/react-icons'
import { ReactNode } from 'react'
import { motion, useIsPresent, type Variants } from 'framer-motion'
import { useTimeoutFn, useUpdateEffect } from 'react-use'

import { dismissNotification } from '@features/notifications/notification.slice'
import { useAppDispatch } from '@redux/hooks'

export type Notification = {
  /**
   * The notification id.
   */
  id: string

  /**
   * The message of the notification
   */
  message: string

  /**
   * An optional dismiss duration time
   *
   * @default 6000
   */
  autoHideDuration?: number

  /**
   * The type of notification to show.
   */
  type?: 'success' | 'error' | 'warning' | 'info'

  /**
   * Optional callback function to run side effects after the notification has closed.
   */
  onClose?: () => void

  /**
   * Optionally add an action to the notification through a ReactNode
   */
  action?: ReactNode
}

type Props = {
  notification: Notification
}

const motionVariants: Variants = {
  initial: {
    opacity: 0,
    x: 24,
  },
  animate: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    x: 30,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1],
    },
  },
}

const notificationStyleVariants: Record<
  NonNullable<Notification['type']>,
  string
> = {
  success: 'bg-green-3 border-green-6',
  error: 'bg-red-3 border-red-6',
  info: 'bg-purple-3 border-purple-6',
  warning: 'bg-yellow-3 border-yellow-6',
}

const closeButtonStyleVariants: Record<
  NonNullable<Notification['type']>,
  string
> = {
  success: 'hover:bg-green-5 active:bg-green-6',
  error: 'hover:bg-red-5 active:bg-red-6',
  info: 'hover:bg-purple-5 active:bg-purple-6',
  warning: 'hover:bg-yellow-5 active:bg-yellow-6',
}

export const NotificationItem = ({
  notification: {
    id,
    autoHideDuration = 6000,
    message,
    onClose,
    type = 'info',
  },
}: Props) => {
  const dispatch = useAppDispatch()
  const isPresent = useIsPresent()

  // Handle dismiss of a single notification
  const handleDismiss = () => {
    if (isPresent) {
      dispatch(dismissNotification(id))
    }
  }

  // Call the dismiss function after a certain timeout
  const [, cancel, reset] = useTimeoutFn(handleDismiss, autoHideDuration)

  // Reset or cancel dismiss timeout based on mouse interactions
  const onMouseEnter = () => cancel()
  const onMouseLeave = () => reset()

  // Call `onDismissComplete` when notification unmounts if present
  useUpdateEffect(() => {
    if (!isPresent) {
      onClose?.()
    }
  }, [isPresent])

  return (
    <motion.li
      className={clsx(
        'flex min-w-[260px] items-center rounded border px-4 py-3 text-sm shadow transition-colors duration-100',
        notificationStyleVariants[type]
      )}
      initial="initial"
      animate="animate"
      exit="exit"
      layout="position"
      variants={motionVariants}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span className="max-w-sm font-medium">{message}</span>

      <div className="ml-auto pl-4">
        <button
          onClick={handleDismiss}
          className={clsx(
            'rounded p-1 transition-colors duration-100',
            closeButtonStyleVariants[type]
          )}
        >
          <Cross2Icon />
        </button>
      </div>
    </motion.li>
  )
}
