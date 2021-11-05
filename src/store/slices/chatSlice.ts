import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MetaMessage, NumberMessage } from '../../interfaces';

interface JoinRoomPayload {
	roomName: string;
}

interface SetNumberPayload {
	number: number;
}



interface ChatState {
	metaMessages: {
		joined: MetaMessage | null;
		welcome: MetaMessage | null;
	};
	numberMessages: NumberMessage[];
	isFirst: boolean;
	number: number | null;
	lastNumber: number | null;
	joinedRoomName: string;
}

const initialState: ChatState = {
	metaMessages: {
		joined: null,
		welcome: null
	},
	numberMessages: [],
	isFirst: true,
	number: null,
	lastNumber: null,
	joinedRoomName: '',
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
		joinRoom(state, {payload}: PayloadAction<JoinRoomPayload>){
			state.joinedRoomName = payload.roomName;
		},
		setMetaMessage(state, {payload}: PayloadAction<MetaMessage>) {
			if(payload.message.includes('welcome')){
				state.metaMessages.welcome = payload;
				state.joinedRoomName = payload.room;
			}
			if(payload.message.includes('joined')){
				state.metaMessages.joined = payload;
			}
		},
		setNumber(state, {payload}: PayloadAction<SetNumberPayload>){
			state.number = payload.number;
		},
		addNumberMessage(state, {payload}: PayloadAction<NumberMessage>) {
			state.numberMessages.push({...payload, lastNumber: state.number});
		},
		resetChat(state){
			Object.assign(state, initialState);
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

