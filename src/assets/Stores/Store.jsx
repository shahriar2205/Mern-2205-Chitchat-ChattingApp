import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../../Components/Slices/userSlice'
import ActiveChatSlice from '../../Components/ActiveChatSlices/ActiveChatSlice'


export const store = configureStore({
  reducer: {
    userLoginInfo:userSlice,
    ActiveChatSlice:ActiveChatSlice
  },
})