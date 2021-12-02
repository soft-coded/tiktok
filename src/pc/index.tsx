import { useEffect, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import "./index.scss";
import { RootState } from "../common/store";
import FullscreenSpinner from "./components/fullscreen-spinner";
import Header from "./components/header";
import Home from "./pages/home";
import Notification from "./components/notification";
import AuthModal from "./components/auth-modal";
const VideoModal = lazy(() => import("./components/video-modal"));
const Profile = lazy(() => import("./pages/profile"));
const Video = lazy(() => import("./pages/video"));
const Upload = lazy(() => import("./pages/upload"));

export default function PCLayout() {
	const { pathname } = useLocation();
	const { notification, videoModal, authModal } = useSelector<RootState, any>(
		state => state.pc
	);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<main className="page-container">
			<Header />
			{authModal.show && <AuthModal />}
			{notification.show && (
				<Notification message={notification.message} type={notification.type} />
			)}
			{videoModal.show && (
				<Suspense fallback={<FullscreenSpinner />}>
					<VideoModal {...videoModal.data} />
				</Suspense>
			)}
			<Suspense fallback={<FullscreenSpinner />}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/user/:username" element={<Profile />} />
					<Route path="/video/:videoId" element={<Video />} />
					<Route path="/upload" element={<Upload />} />
				</Routes>
			</Suspense>
		</main>
	);
}
