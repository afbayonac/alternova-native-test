import { configureStore } from '@reduxjs/toolkit'
import productSlice from './products'
import userSlice from './user'

export const store = configureStore({
  reducer: {
    product: productSlice,
    user: userSlice
  }
})
