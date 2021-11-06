import { configureStore } from '@reduxjs/toolkit';
import roomReducer from './slices/roomSlice';
import socketReducer from './slices/socketSlice';
import userReducer from './slices/userSlice';
import chatReducer from './slices/chatSlice';

const store = configureStore({
  reducer: {
		room: roomReducer,
		socket: socketReducer,
		user: userReducer,
		chat: chatReducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store