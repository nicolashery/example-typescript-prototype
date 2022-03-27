import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { userData } from './data'
import { RootState } from './store'
import { User } from './user'

type UserState = User

const initialState: UserState = userData

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    accountUpdated: (state, action: PayloadAction<User>) => {
      state.name = action.payload.name
      state.email = action.payload.email
    },
  },
})

export const { accountUpdated } = userSlice.actions

export const selectUser = (state: RootState): User => {
  return state.user
}

export const userReducer = userSlice.reducer
