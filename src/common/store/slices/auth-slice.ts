import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as authApi from "../../api/auth";
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

export const loginThunk = createAsyncThunk(
	"auth/login",
	async (payload: LoginData) => {
		const res = await authApi.login(payload);
		return res.data;
	}
);

export const signupThunk = createAsyncThunk(
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
		login(_, action) {
			localStorage.setItem(
				"userData",
				JSON.stringify({
					username: action.payload.username,
					token: action.payload.token
				})
			);
			// fetch from the store after reload
			window.location.reload();
		},
		logout() {
			localStorage.removeItem("userData");
			// reload automatically resets all state
			window.location.href = "/";
		},
		loginOnLoad(state) {
			if (localStorage.getItem("userData")) {
				const user = JSON.parse(localStorage.getItem("userData")!);
				state.username = user.username;
				state.token = user.token;
				state.isAuthenticated = true;
			}
			state.status = null;
		}
	},
	extraReducers: builder => {
		builder.addCase(loginThunk.fulfilled, (state, action) => {
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
