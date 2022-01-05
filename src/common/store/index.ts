import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth";
import PCReducer from "../../pc/store";
import MobileReducer from "../../mobile/store";

const store = configureStore({
	reducer: { auth: authReducer, pc: PCReducer, mobile: MobileReducer }
});

export default store;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<
	ReturnType<typeof store.getState>
> = useSelector;
