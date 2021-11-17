import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
	name: "modal",
	initialState: {
		show: false,
		data: null
	},
	reducers: {
		showModal(state, action) {
			state.show = true;
			state.data = action.payload;
		},
		hideModal(state) {
			state.show = false;
			state.data = null;
		}
	}
});

export default modalSlice.reducer;
export const modalActions = modalSlice.actions;
