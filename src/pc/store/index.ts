import { combineReducers } from "@reduxjs/toolkit";

import notifReducer from "./slices/notification-slice";
import videoModalReducer from "./slices/video-modal-slice";
import authModalReducer from "./slices/auth-modal-slice";

export default combineReducers({
	notification: notifReducer,
	videoModal: videoModalReducer,
	authModal: authModalReducer
});
