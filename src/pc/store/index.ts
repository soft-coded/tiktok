import { combineReducers } from "@reduxjs/toolkit";

import authModalReducer from "./slices/auth-modal-slice";
import sidebarReducer from "./slices/sidebar-slice";
import searchReducer from "./slices/search-slice";

export default combineReducers({
	authModal: authModalReducer,
	sidebar: sidebarReducer,
	search: searchReducer
});
