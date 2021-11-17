import { createSlice } from "@reduxjs/toolkit";

const notifSlice = createSlice({
	name: "notification",
	initialState: {
		show: false,
		type: null,
		message: null
	},
	reducers: {
		showNotification(state, action) {
			state.show = true;
			state.type = action.payload.type;
			state.message = action.payload.message;
		},
		hideNotification(state) {
			state.show = false;
			state.type = null;
			state.message = null;
		}
	}
});

export default notifSlice.reducer;
export const notificationActions = notifSlice.actions;
