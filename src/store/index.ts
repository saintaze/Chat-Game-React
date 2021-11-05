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

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch