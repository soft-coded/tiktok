import { createSlice } from "@reduxjs/toolkit";

const videoModalSlice = createSlice({
	name: "videoModal",
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

export default videoModalSlice.reducer;
export const videoModalActions = videoModalSlice.actions;
