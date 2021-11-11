import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		isAuthenticated: false,
		username: null,
		error: null
	},
	reducers: {
		login(state, action) {
			state.username = action.payload.username;
			state.isAuthenticated = true;
			state.error = null;
			localStorage.setItem("username", action.payload.username);
		},
		logout(state) {
			state.username = null;
			state.isAuthenticated = false;
			state.error = null;
			localStorage.removeItem("username");
		}
	}
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
