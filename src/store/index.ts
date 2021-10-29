import { configureStore } from '@reduxjs/toolkit';
import roomReducer from './slices/roomSlice';


export default configureStore({
  reducer: {
		room: roomReducer
	}
})