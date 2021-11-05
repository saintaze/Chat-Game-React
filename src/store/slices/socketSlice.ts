import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SocketPayload {
	socket: SocketIOClient.Socket;
}

interface SocketState {
	socket: SocketIOClient.Socket | null; 
}

const initialState: SocketState = {
	socket: null
}

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
		setSocket(state, {payload}: PayloadAction<SocketPayload>){
			state.socket = payload.socket;
		}
  }
})

export const { 
	setSocket
} = socketSlice.actions

export default socketSlice.reducer