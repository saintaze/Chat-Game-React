import { configureStore } from '@reduxjs/toolkit';
import roomReducer from './slices/roomSlice';
import socketReducer from './slices/socketSlice';
import userReducer from './slices/userSlice';
import chatReducer from './slices/chatSlice';


export default configureStore({
  reducer: {
		room: roomReducer,
		socket: socketReducer,
		user: userReducer,
		chat: chatReducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})