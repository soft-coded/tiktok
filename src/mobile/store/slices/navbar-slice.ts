import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { hasNewNotifs } from "../../../common/api/user";

interface InitState {
	hasNewNotifs: boolean;
}

const initialState: InitState = { hasNewNotifs: false };

const fetchNewNotifs = createAsyncThunk(
	"navbar/fetchNewNotifs",
	async ({ username, token }: { username: string; token: string }) => {
		const res = await hasNewNotifs(username, token);
		return res.data;
	}
);

const navbarSlice = createSlice({
	name: "navbar",
	initialState,
	reducers: {
		hasReadNotifs(state) {
			state.hasNewNotifs = false;
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchNewNotifs.fulfilled, (state, action) => {
			state.hasNewNotifs = action.payload.hasNew;
		});

		builder.addCase(fetchNewNotifs.pending, state => {
			state.hasNewNotifs = false;
		});

		builder.addCase(fetchNewNotifs.rejected, (state, action) => {
			state.hasNewNotifs = false;
			console.error(action.error);
		});
	}
});

export default navbarSlice.reducer;
export const navbarActions = navbarSlice.actions;
export { fetchNewNotifs };
