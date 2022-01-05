import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../../common/store";
import { notificationActions } from "../../store/slices/notification-slice";

export default function PrivateRoute() {
	const isAuthed = useAppSelector(state => state.auth.isAuthenticated);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!isAuthed) {
			dispatch(
				notificationActions.showNotification({
					type: "error",
					message: "Log in to continue"
				})
			);
		}
	}, [dispatch, isAuthed]);

	return isAuthed ? <Outlet /> : <Navigate to="/" replace />;
}
