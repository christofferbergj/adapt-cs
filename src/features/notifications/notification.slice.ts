import { RootState } from '@redux/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'
import { useAppSelector } from '@redux/hooks'

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
  duration?: number

  /**
   * The type of notification to show.
   */
  type?: 'success' | 'error' | 'warning' | 'info'

  /**
   * Optional callback function to run side effects after the notification has closed.
   */
  onDismissComplete?: () => void
}

type NotificationsState = {
  notifications: Notification[]
}

const initialState: NotificationsState = {
  notifications: [],
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (
      state,
      { payload }: PayloadAction<Omit<Notification, 'id'>>
    ) => {
      const notification: Notification = {
        id: nanoid(),
        ...payload,
      }

      state.notifications.push(notification)
    },
    dismissNotification: (
      state,
      { payload }: PayloadAction<Notification['id']>
    ) => {
      const index = state.notifications.findIndex(
        (notification) => notification.id === payload
      )

      if (index !== -1) {
        state.notifications.splice(index, 1)
      }
    },
  },
})

const { reducer, actions } = notificationsSlice

export const { addNotification, dismissNotification } = actions

const selectNotifications = (state: RootState) =>
  state.notifications.notifications

export const useNotifications = () => useAppSelector(selectNotifications)

export default reducer
