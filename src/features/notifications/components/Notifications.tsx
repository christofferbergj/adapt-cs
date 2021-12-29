import { useNotifications } from '@features/notifications/notification.slice'

import { NotificationItem } from '@features/notifications/components/NotificationItem'
import { NotificationList } from '@features/notifications/components/NotificationList'

export const Notifications = () => {
  const notifications = useNotifications()

  return (
    <NotificationList>
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </NotificationList>
  )
}
