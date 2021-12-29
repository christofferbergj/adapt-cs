import { motion, useIsPresent, type Variants } from 'framer-motion'
import { useTimeoutFn, useUpdateEffect } from 'react-use'

import type { Notification } from '@features/notifications/notification.slice'
import { dismissNotification } from '@features/notifications/notification.slice'
import { useAppDispatch } from '@redux/hooks'

type Props = {
  notification: Notification
}

const variants: Variants = {
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

export const NotificationItem = ({
  notification: { duration = 6000, id, onDismissComplete },
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
  const [, cancel, reset] = useTimeoutFn(handleDismiss, duration)

  // Reset or cancel dismiss timeout based on mouse interactions
  const onMouseEnter = () => cancel()
  const onMouseLeave = () => reset()

  // Call `onDismissComplete` when notification unmounts if present
  useUpdateEffect(() => {
    if (!isPresent) {
      onDismissComplete?.()
    }
  }, [isPresent])

  return (
    <motion.li
      className="px-4 py-2 rounded border transition-colors duration-100 bg-green-3 border-green-6 hover:border-green-6 hover:bg-green-4 hover:bg-purple-5"
      initial="initial"
      animate="animate"
      exit="exit"
      layout="position"
      variants={variants}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button onClick={handleDismiss}>Dismiss</button>
      <h2>Hello from NotificationItem</h2>
    </motion.li>
  )
}
