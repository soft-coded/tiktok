import { useEffect, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./index.scss";
import { useAppSelector } from "../common/store";
import FullscreenSpinner from "./components/fullscreen-spinner";
import Header from "./components/header";
import Notification from "./components/notification";
import AuthModal from "./components/auth-modal";
import PrivateRoute from "./components/private-route";
const VideoModal = lazy(() => import("./components/video-modal"));
const Home = lazy(() => import("./pages/home"));
const Profile = lazy(() => import("./pages/profile"));
const Video = lazy(() => import("./pages/video"));
const Upload = lazy(() => import("./pages/upload"));

export default function PCLayout() {
	const { pathname } = useLocation();
	const { notification, videoModal, authModal } = useAppSelector(
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
				<Notification
					message={notification.message!}
					type={notification.type!}
				/>
			)}
			{/* keep modal in a separate Suspense or it rerenders the routes as well */}
			<Suspense fallback={<FullscreenSpinner />}>
				{videoModal.show && <VideoModal {...videoModal.data!} />}
			</Suspense>
			<Suspense fallback={<FullscreenSpinner />}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/user/:username" element={<Profile />} />
					<Route path="/video/:videoId" element={<Video />} />
					<Route element={<PrivateRoute />}>
						<Route path="/upload" element={<Upload />} />
					</Route>
				</Routes>
			</Suspense>
		</main>
	);
}
