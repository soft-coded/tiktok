import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as authApi from "../../../common/api/auth";
import { LoginData, SignupData } from "../../types";

interface InitState {
	isAuthenticated: boolean;
	token: string | null;
	username: string | null;
	status: "fetching" | "loading" | null;
	error: string | null;
}

const initialState: InitState = {
	isAuthenticated: false,
	token: null,
	username: null,
	status: "fetching",
	error: null
};

const loginThunk = createAsyncThunk(
	"auth/login",
	async (payload: LoginData) => {
		const res = await authApi.login(payload);
		return res.data;
	}
);

const signupThunk = createAsyncThunk(
	"auth/signup",
	async (payload: SignupData) => {
		const res = await authApi.signup(payload);
		return res.data;
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login(state, action) {
			state.username = action.payload.username;
			state.token = action.payload.token;
			state.isAuthenticated = true;
			state.status = null;
			localStorage.setItem(
				"userData",
				JSON.stringify({
					username: action.payload.username,
					token: action.payload.token
				})
			);
		},
		logout(state) {
			state.username = null;
			state.isAuthenticated = false;
			state.token = null;
			localStorage.removeItem("userData");
		},
		loginOnLoad(state) {
			const userData = localStorage.getItem("userData");
			if (userData) {
				authSlice.caseReducers.login(state, JSON.parse(userData));
			} else state.status = null;
		}
	},
	extraReducers: builder => {
		builder.addCase(loginThunk.fulfilled, (state, action) => {
			state.error = null;
			authSlice.caseReducers.login(state, action);
		});

		builder.addCase(loginThunk.pending, state => {
			state.error = null;
			state.status = "loading";
		});

		builder.addCase(loginThunk.rejected, (state, action) => {
			state.error = action.error.message!;
			state.status = null;
		});

		builder.addCase(signupThunk.fulfilled, (state, action) => {
			state.error = null;
			authSlice.caseReducers.login(state, action);
		});

		builder.addCase(signupThunk.pending, state => {
			state.error = null;
			state.status = "loading";
		});

		builder.addCase(signupThunk.rejected, (state, action) => {
			state.error = action.error.message!;
			state.status = null;
		});
	}
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
export { signupThunk, loginThunk };
