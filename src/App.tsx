import { useEffect } from "react";

import PCLayout from "./pc";
import "./common/styles.scss";
import { authActions } from "./common/store/slices/auth";
import { useAppDispatch, useAppSelector } from "./common/store";
import FullscreenSpinner from "./pc/components/fullscreen-spinner";

export default function App() {
	const dispatch = useAppDispatch();
	const authStatus = useAppSelector(state => state.auth.status);

	useEffect(() => {
		dispatch(authActions.loginOnLoad());
	}, [dispatch]);

	return authStatus === "fetching" ? <FullscreenSpinner /> : <PCLayout />;
}
