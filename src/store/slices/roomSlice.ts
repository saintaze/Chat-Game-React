import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const BASE_URI = 'http://localhost:3004';

export const fetchRooms = createAsyncThunk(
  'room/fetchRoom',
  async (payload, thunkAPI) => {
		try{
			const { data } = await axios.get(`${BASE_URI}/rooms`);
			return data;
		}catch(err: any){
			return thunkAPI.rejectWithValue(err.response.data);
		}
  }
)


const roomInitialState = {
	allRooms: [],
	joinedRoomName: '',
	loading: false,
	errorMessage: '' 
}

export const roomSlice = createSlice({
  name: 'room',
  initialState: roomInitialState,
  reducers: {
		createNewPhase(state, {payload}){
		},
		joinRoom(state, {payload}){
			state.joinedRoomName = payload.roomName;
		}
  },
	extraReducers: (builder) => {
		builder.addCase(fetchRooms.pending, (state, action) => {
			state.loading = true;
		})
    builder.addCase(fetchRooms.fulfilled, (state, action) => {
      state.allRooms = action.payload;
			state.loading = false;
    })
    builder.addCase(fetchRooms.rejected, (state, action) => {
			// state.errorMessage = action.error.message;
			state.loading = false;
    })
  }
})

export const { 
	createNewPhase,
	joinRoom
} = roomSlice.actions

export default roomSlice.reducer