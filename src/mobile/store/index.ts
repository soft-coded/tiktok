import { combineReducers } from "@reduxjs/toolkit";

import navbarReducer from "./slices/navbar-slice";

export default combineReducers({ navbar: navbarReducer });
