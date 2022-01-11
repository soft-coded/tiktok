import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import "./index.scss";
import Navbar from "./components/navbar";
import Notification from "../common/components/notification";
import FullscreenSpinner from "../common/components/fullscreen-spinner";
import { useAppSelector } from "../common/store";
const Home = lazy(() => import("./pages/home"));

export default function MobileLayout() {
	const notification = useAppSelector(state => state.notification);

	return (
		<main className="root-container">
			{notification.show && (
				<Notification
					type={notification.type!}
					message={notification.message!}
					isMobile={true}
				/>
			)}
			<Suspense fallback={<FullscreenSpinner />}>
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</Suspense>
			<Navbar />
			<div id="portal" />
		</main>
	);
}
