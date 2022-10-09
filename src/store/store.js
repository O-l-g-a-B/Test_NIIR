import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/auth/authSlice'
import contentSlice from '../features/content/contentSlice'

export default configureStore({
  reducer: {
    auth: authSlice,
    content: contentSlice,
  }
})