import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../../Components/Slices/userSlice'


export const store = configureStore({
  reducer: {
    userLoginInfo:userSlice
  },
})