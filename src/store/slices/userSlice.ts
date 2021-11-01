import { createSlice } from '@reduxjs/toolkit';

const userInitialState = {
	userInfo: {
		username: ''
	},
}

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
		setUserInfo(state, {payload}){
			if(!state.userInfo.username){
				state.userInfo.username = payload.user
			}
		}
  }
})

export const { 
	setUserInfo
} = userSlice.actions

export default userSlice.reducer