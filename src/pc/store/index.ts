import { combineReducers } from "@reduxjs/toolkit";

import notifReducer from "./slices/notification-slice";
import modalReducer from "./slices/modal-slice";

export default combineReducers({
	notification: notifReducer,
	modal: modalReducer
});
