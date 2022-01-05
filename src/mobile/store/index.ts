import { combineReducers } from "@reduxjs/toolkit";

import notificationReducer from "./slices/notification-slice";

export default combineReducers({ notification: notificationReducer });
