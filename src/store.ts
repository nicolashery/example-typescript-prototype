import { configureStore } from '@reduxjs/toolkit'
import { formsReducer } from './formsSlice'
import { responsesReducer } from './responsesSlice'
import { userReducer } from './userSlice'

export const store = configureStore({
  reducer: {
    forms: formsReducer,
    responses: responsesReducer,
    user: userReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
