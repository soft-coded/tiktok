import { combineReducers } from "@reduxjs/toolkit";

import sidebarReducer from "./slices/sidebar-slice";
import searchReducer from "./slices/search-slice";

export default combineReducers({
	sidebar: sidebarReducer,
	search: searchReducer
});
