import { useEffect, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./index.scss";
import FullscreenSpinner from "./components/fullscreen-spinner";
import Header from "./components/header";
import Home from "./pages/home";
const Profile = lazy(() => import("./pages/profile"));
const Video = lazy(() => import("./pages/video"));

export default function PCLayout() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<main className="page-container">
			<Header />
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
