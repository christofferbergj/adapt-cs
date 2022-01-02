import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { FineType } from '@app/fine-types'
import type { RootState } from '@redux/store'
import type { User } from '@app/users'
import { useAppSelector } from '@redux/hooks'

type CreateFineState = {
  selectedFineType: FineType['id'] | null
  selectedUser: User['id'] | null
}

const initialState: CreateFineState = {
  selectedFineType: null,
  selectedUser: null,
}

const createFineSlice = createSlice({
  name: 'create-fine',
  initialState,
  reducers: {
    setSelectedFineType: (
      state,
      { payload }: PayloadAction<CreateFineState['selectedFineType']>
    ) => {
      const fineTypeIsEqual = state.selectedFineType === payload
      state.selectedFineType = fineTypeIsEqual ? null : payload
    },
    setSelectedUser: (
      state,
      { payload }: PayloadAction<CreateFineState['selectedUser']>
    ) => {
      const userIsEqual = state.selectedUser === payload
      state.selectedUser = userIsEqual ? null : payload
    },
    resetState: () => initialState,
  },
})

const { actions, reducer } = createFineSlice

export const { setSelectedFineType, setSelectedUser, resetState } = actions

// Selectors
const selectCreateFineState = (state: RootState) => state.createFine
const selectSelectedFineType = (state: RootState) =>
  state.createFine.selectedFineType
const selectSelectedUser = (state: RootState) => state.createFine.selectedUser

// Hooks
export const useCreateFineState = () => useAppSelector(selectCreateFineState)
export const useSelectedFineType = () => useAppSelector(selectSelectedFineType)
export const useSelectedUser = () => useAppSelector(selectSelectedUser)

export default reducer
