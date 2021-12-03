import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PCLayout from "./pc";
import "./common/styles.scss";
import { authActions } from "./common/store/slices/auth";
import { RootState } from "./common/store";
import FullscreenSpinner from "./pc/components/fullscreen-spinner";

export default function App() {
	const dispatch = useDispatch();
	const authStatus = useSelector<RootState, any>(state => state.auth.status);

	useEffect(() => {
		dispatch(authActions.loginOnLoad(null));
	}, [dispatch]);

	return authStatus === "fetching" ? <FullscreenSpinner /> : <PCLayout />;
}
