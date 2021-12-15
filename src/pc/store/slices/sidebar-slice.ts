import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getCustom } from "../../../common/api/user";
import { getSuggested } from "../../../common/api/feed";
import { UserData } from "../../../common/types";

interface InitState {
	following: UserData[] | null;
	suggested: UserData[] | null;
	error: string | null;
}

const initialState: InitState = {
	following: null,
	suggested: null,
	error: null
};

const fetchFollowing = createAsyncThunk(
	"sidebar/following",
	async (username: string) => {
		const res = await getCustom({ following: "list" }, username);
		return res.data.following.slice(0, 5);
	}
);

const fetchSuggested = createAsyncThunk("sidebar/suggested", async () => {
	const res = await getSuggested();
	return res.data.users;
});

const sidebarSlice = createSlice({
	name: "sidebar",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchFollowing.pending, state => {
			state.following = null;
			state.error = null;
		});

		builder.addCase(fetchFollowing.rejected, (state, action) => {
			state.error = action.error.message!;
			state.following = [];
		});

		builder.addCase(fetchFollowing.fulfilled, (state, action) => {
			state.error = null;
			state.following = action.payload;
		});

		builder.addCase(fetchSuggested.pending, state => {
			state.suggested = null;
			state.error = null;
		});

		builder.addCase(fetchSuggested.rejected, (state, action) => {
			state.error = action.error.message!;
			state.suggested = [];
		});

		builder.addCase(fetchSuggested.fulfilled, (state, action) => {
			state.error = null;
			state.suggested = action.payload;
		});
	}
});

export default sidebarSlice.reducer;
export const sidebarActions = sidebarSlice.actions;
export { fetchFollowing, fetchSuggested };
