import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 active:"jibon"
}

export const ActiveChatSlice = createSlice({
  name: 'activeChat',
  initialState,
  reducers: {
    activeChat: (state,action) => {
    state.active=action.payload

    },
   
  },
})

export const {activeChat} = ActiveChatSlice.actions
export default ActiveChatSlice.reducer