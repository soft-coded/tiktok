import { createSlice } from "@reduxjs/toolkit";

interface InitState {
	query: string;
}

const initialState: InitState = {
	query: ""
};

const searchSlice = createSlice({
	name: "search",
	initialState,
	reducers: {
		putQuery(state, action) {
			state.query = action.payload;
		},
		dropQuery(state) {
			state.query = "";
		}
	}
});

export default searchSlice.reducer;
export const searchActions = searchSlice.actions;
