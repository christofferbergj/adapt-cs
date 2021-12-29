import { useNotifications } from '@features/notifications/notification.slice'

import { NotificationItem } from '@components/common/Notifications/NotificationItem'
import { NotificationList } from '@components/common/Notifications/NotificationList'

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
