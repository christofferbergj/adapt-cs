import { combineReducers } from '@reduxjs/toolkit'
import createFineReducer from '@features/create-fine/createFineSlice'

export const rootReducer = combineReducers({
  createFine: createFineReducer,
})
