import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 active: localStorage.getItem('activeFrndlist') ? JSON.parse(localStorage.getItem('activeFrndlist')) : null,
 
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