import { useEffect, Suspense, lazy } from "react";

import "./common/styles.scss";
import { authActions } from "./common/store/slices/auth-slice";
import { useAppDispatch, useAppSelector } from "./common/store";
import FullscreenSpinner from "./common/components/fullscreen-spinner";
import constants from "./common/constants";
const PCLayout = lazy(() => import("./pc"));
const MobileLayout = lazy(() => import("./mobile"));

export default function App() {
	const dispatch = useAppDispatch();
	const authStatus = useAppSelector(state => state.auth.status);
	const isMobile = window.matchMedia(
		"(max-width: " + constants.mobileWidth + "px)"
	).matches;

	useEffect(() => {
		dispatch(authActions.loginOnLoad());
	}, [dispatch]);

	return authStatus === "fetching" ? (
		<FullscreenSpinner />
	) : (
		<Suspense fallback={<FullscreenSpinner />}>
			{isMobile ? <MobileLayout /> : <PCLayout />}
		</Suspense>
	);
}
