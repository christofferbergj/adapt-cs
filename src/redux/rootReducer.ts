import { combineReducers } from '@reduxjs/toolkit'

import createFineReducer from '@features/create-fine/createFineSlice'
import notificationsReducer from '@features/notifications/notification.slice'

export const rootReducer = combineReducers({
  createFine: createFineReducer,
  notifications: notificationsReducer,
})
