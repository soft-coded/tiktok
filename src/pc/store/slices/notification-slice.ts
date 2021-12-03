import { createSlice } from "@reduxjs/toolkit";

interface InitState {
	show: boolean;
	type: "error" | "warning" | "success" | "info" | null;
	message: string | null;
}

const initialState: InitState = {
	show: false,
	type: null,
	message: null
};

const notifSlice = createSlice({
	name: "notification",
	initialState,
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
