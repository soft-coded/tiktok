import { combineReducers } from "@reduxjs/toolkit";

import notifReducer from "./slices/notification-slice";
import authModalReducer from "./slices/auth-modal-slice";
import sidebarReducer from "./slices/sidebar-slice";
import searchReducer from "./slices/search-slice";

export default combineReducers({
	notification: notifReducer,
	authModal: authModalReducer,
	sidebar: sidebarReducer,
	search: searchReducer
});
