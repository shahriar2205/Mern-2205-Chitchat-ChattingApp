import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 active: localStorage.getItem('activeChat') ? JSON.parse(localStorage.getItem('activeChat')) : "jibon",

}
console.log(localStorage.activeChat);

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