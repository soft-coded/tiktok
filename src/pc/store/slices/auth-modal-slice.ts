import { createSlice } from "@reduxjs/toolkit";

const authModalSlice = createSlice({
	name: "authModal",
	initialState: {
		show: false
	},
	reducers: {
		showModal(state) {
			state.show = true;
		},
		hideModal(state) {
			state.show = false;
		}
	}
});

export default authModalSlice.reducer;
export const authModalActions = authModalSlice.actions;
