import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserPayload {
	user: string;
}

interface UserState {
  userInfo: {
		username: string;
	}
}

const initialState: UserState = {
	userInfo: {
		username: ''
	}
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
		setUserInfo(state, {payload}: PayloadAction<UserPayload>){
			if(!state.userInfo.username){
				state.userInfo.username = payload.user;
			}
		}
  }
})

export const { 
	setUserInfo
} = userSlice.actions

export default userSlice.reducer