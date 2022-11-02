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
