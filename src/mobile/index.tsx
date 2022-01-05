import { useEffect, Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import "./index.scss";
import Navbar from "./components/navbar";
import Notification from "./components/notification";
import FullscreenSpinner from "../common/components/fullscreen-spinner";
import { useAppSelector } from "../common/store";
const Home = lazy(() => import("./pages/home"));

export default function MobileLayout() {
	const { pathname } = useLocation();
	const notification = useAppSelector(state => state.mobile.notification);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<main className="root-container">
			{notification.show && (
				<Notification
					type={notification.type!}
					message={notification.message!}
				/>
			)}
			<Suspense fallback={<FullscreenSpinner />}>
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</Suspense>
			<Navbar />
		</main>
	);
}
