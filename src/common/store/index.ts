import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth";
import PCReducer from "../../pc/store";

const store = configureStore({
	reducer: { auth: authReducer, pc: PCReducer }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
