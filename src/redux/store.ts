import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import categoriesReducer from './slices/categoriesSlice'
import cartReducer from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

