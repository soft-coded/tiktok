import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
	name: "modal",
	initialState: {
		show: false,
		data: null
	},
	reducers: {
		showNotification(state, action) {
			state.show = true;
			state.data = action.payload;
		},
		hideNotification(state) {
			state.show = false;
			state.data = null;
		}
	}
});

export default modalSlice.reducer;
export const modalActions = modalSlice.actions;
