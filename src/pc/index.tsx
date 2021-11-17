import { useEffect, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import "./index.scss";
import FullscreenSpinner from "./components/fullscreen-spinner";
import Header from "./components/header";
import Home from "./pages/home";
import Notification from "./components/notification";
import LazyModal from "./components/video-modal/LazyModal";
const Profile = lazy(() => import("./pages/profile"));
const Video = lazy(() => import("./pages/video"));

export default function PCLayout() {
	const { pathname } = useLocation();
	const PCState = useSelector<any>(state => state.pc);

	console.log(PCState);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<main className="page-container">
			<Header />
			<Notification message="Logged in successfully." type="info" />

			<Suspense fallback={<FullscreenSpinner />}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/user/:username" element={<Profile />} />
					<Route path="/video/:videoId" element={<Video />} />
				</Routes>
			</Suspense>
		</main>
	);
}
