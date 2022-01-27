import { useEffect, Suspense, lazy, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import "./index.scss";
import { useAppSelector } from "../common/store";
import FullscreenSpinner from "../common/components/fullscreen-spinner";
import Header from "./components/header";
import Notification from "../common/components/notification";
import AuthModal from "../common/components/auth-modal";
import PrivateRoute from "../common/components/private-route";
import LegalNotice from "../common/components/legal-notice";
const Home = lazy(() => import("./pages/home"));
const Following = lazy(() => import("./pages/following"));
const Profile = lazy(() => import("./pages/profile"));
const Video = lazy(() => import("./pages/video"));
const Upload = lazy(() => import("./pages/upload"));
const EditProfile = lazy(() => import("./pages/edit-profile"));
const Search = lazy(() => import("./pages/search"));

export default function PCLayout() {
	const { pathname } = useLocation();
	const { notification, authModal } = useAppSelector(state => state);
	const [showNotice, setShowNotice] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	useEffect(() => {
		let hasSeenNotice: any = localStorage.getItem("hasSeenNotice");
		if (hasSeenNotice && JSON.parse(hasSeenNotice)) return;
		setShowNotice(true);
		localStorage.setItem("hasSeenNotice", JSON.stringify(true));
	}, []);

	return (
		<main className="page-container">
			<Header />
			{showNotice && <LegalNotice setShowNotice={setShowNotice} />}
			{authModal.show && <AuthModal />}
			{notification.show && (
				<Notification
					message={notification.message!}
					type={notification.type!}
				/>
			)}
			<Suspense fallback={<FullscreenSpinner />}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/following" element={<Following />} />
					<Route path="/user/:username" element={<Profile />} />
					<Route path="/video/:videoId" element={<Video />} />
					<Route path="/search" element={<Search />} />
					<Route path="/profile" element={<Navigate to="/" />} />
					<Route path="/notifications" element={<Navigate to="/" />} />
					<Route element={<PrivateRoute />}>
						<Route path="/upload" element={<Upload />} />
						<Route path="/edit-profile" element={<EditProfile />} />
					</Route>
				</Routes>
			</Suspense>
			<div id="portal" />
		</main>
	);
}
