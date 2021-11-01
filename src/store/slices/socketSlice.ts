import { createSlice } from '@reduxjs/toolkit';

const socketInitialState = {
	socket: null
}

export const socketSlice = createSlice({
  name: 'socket',
  initialState: socketInitialState,
  reducers: {
		setSocket(state, {payload}){
			state.socket = payload.socket
		}
  }
})

export const { 
	setSocket
} = socketSlice.actions

export default socketSlice.reducer