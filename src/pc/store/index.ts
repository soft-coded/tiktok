import { combineReducers } from "@reduxjs/toolkit";

import notifReducer from "./slices/notification-slice";
import authModalReducer from "./slices/auth-modal-slice";
import sidebarReducer from "./slices/sidebar-slice";

export default combineReducers({
	notification: notifReducer,
	authModal: authModalReducer,
	sidebar: sidebarReducer
});
