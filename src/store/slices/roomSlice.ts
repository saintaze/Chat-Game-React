import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import connection from '../../constants/connection';
import { Room } from '../../interfaces';

interface ValidationErrors {
  errorMessage: string;
  field_errors: Record<string, string>;
}
interface RoomState {
	allRooms: Room[];
	loading: boolean;
	errorMessage: string;
}

export const fetchRooms = createAsyncThunk<Room[], void, { rejectValue: ValidationErrors }>(
  'room/fetchRoom',
  async (_, {rejectWithValue}) => {
		try{
			const { data } = await axios.get<Room[]>(`${connection.BASE_URL}/rooms`);
			return data;
		}catch(err: any){
			let error: AxiosError<ValidationErrors> = err
			if (!error.response) {
				throw err;
			}
			return rejectWithValue(error.response.data);
		}
  }
)

const initialState: RoomState = {
	allRooms: [],
	loading: false,
	errorMessage: '', 
}

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchRooms.pending, (state) => {
			state.loading = true;
		})
    builder.addCase(fetchRooms.fulfilled, (state, {payload}) => {
      state.allRooms = payload;
			state.loading = false;
			state.errorMessage = '';
    })
    builder.addCase(fetchRooms.rejected, (state, {payload, error}) => {
			if (payload) {
        state.errorMessage = payload.errorMessage;
      }
			if(error.message){
				state.errorMessage = error.message;
			}
			state.loading = false;
			state.allRooms = [];
    })
  }
})


export default roomSlice.reducer