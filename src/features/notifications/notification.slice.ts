import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

import type { Notification } from '@features/notifications/components/NotificationItem'
import { RootState } from '@redux/store'
import { useAppSelector } from '@redux/hooks'

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
