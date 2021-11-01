import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import connection from '../../enums/connection';


export const fetchRooms = createAsyncThunk(
  'room/fetchRoom',
  async (payload, thunkAPI) => {
		try{
			const { data } = await axios.get(`${connection.BASE_URL}/rooms`);
			return data;
		}catch(err: any){
			return thunkAPI.rejectWithValue(err.response.data);
		}
  }
)


const roomInitialState = {
	allRooms: [],
	loading: false,
	errorMessage: '', 
	// joinedRoomName: ''
}

export const roomSlice = createSlice({
  name: 'room',
  initialState: roomInitialState,
  reducers: {
		// joinRoom(state, {payload}){
		// 	state.joinedRoomName = payload.roomName;
		// }
  },
	extraReducers: (builder) => {
		builder.addCase(fetchRooms.pending, (state, action) => {
			state.loading = true;
		})
    builder.addCase(fetchRooms.fulfilled, (state, action) => {
      state.allRooms = action.payload;
			state.loading = false;
			state.errorMessage = '';
    })
    builder.addCase(fetchRooms.rejected, (state, action) => {
			// state.errorMessage = action.error.message;
			state.loading = false;
			state.allRooms = [];
    })
  }
})

export const { 
	// joinRoom
} = roomSlice.actions

export default roomSlice.reducer