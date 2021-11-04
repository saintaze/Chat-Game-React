import { createSlice } from '@reduxjs/toolkit';

const chatInitialState = {
	metaMessages: {
		joined: null,
		welcome: null,
		left: null
	},
	numberMessages: [],
	isFirst: true,
	number: null,
	lastNumber: null,
	joinedRoomName: '',
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState: chatInitialState,
  reducers: {
		joinRoom(state, {payload}){
			state.joinedRoomName = payload.roomName;
		},
		setMetaMessage(state, {payload}) {
			if(payload.message.includes('welcome')){
				// console.log('MEEEE', payload)
				state.metaMessages.welcome = payload;
				state.joinedRoomName = payload.room;
			}
			if(payload.message.includes('joined')){
				state.metaMessages.joined = payload;
			}
		},
		setNumber(state, {payload}){
			// state.lastNumber = state.number
			state.number = payload.number;
		},
		addNumberMessage(state, {payload}) {
			// @ts-ignore
			// state.lastNumber = state.number
			state.numberMessages.push({...payload, lastNumber: state.number});
		},
		resetChat(state){
			Object.assign(state, chatInitialState);
		}
  }
})

export const { 
	setMetaMessage,
	addNumberMessage,
	resetChat,
	setNumber,
	joinRoom
} = chatSlice.actions

export default chatSlice.reducer

