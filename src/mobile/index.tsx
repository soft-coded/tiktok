import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./index.scss";
import Notification from "../common/components/notification";
import FullscreenSpinner from "../common/components/fullscreen-spinner";
import { useAppSelector } from "../common/store";
import AuthModal from "../common/components/auth-modal";
import PrivateRoute from "../common/components/private-route";
import LegalNotice from "../common/components/legal-notice";
const Home = lazy(() => import("./pages/home"));
const Following = lazy(() => import("./pages/following"));
const Profile = lazy(() => import("./pages/profile"));
const OwnProfile = lazy(() => import("./pages/profile/OwnProfile"));
const Video = lazy(() => import("./pages/video"));
const EditProfile = lazy(() => import("./pages/edit-profile"));
const Upload = lazy(() => import("./pages/upload"));
const Notifications = lazy(() => import("./pages/notifications"));
const Search = lazy(() => import("./pages/search"));

export default function MobileLayout() {
	const { notification, authModal } = useAppSelector(state => state);
	const [showNotice, setShowNotice] = useState(false);

	useEffect(() => {
		let usesDarkTheme: any = localStorage.getItem("usesDarkTheme");
		if (usesDarkTheme) {
			usesDarkTheme = JSON.parse(usesDarkTheme);
		} else {
			usesDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
			localStorage.setItem("usesDarkTheme", JSON.stringify(usesDarkTheme));
		}

		document.documentElement.className = usesDarkTheme ? "dark" : "light";
	}, []);

	useEffect(() => {
		let hasSeenNotice: any = localStorage.getItem("hasSeenNotice");
		if (hasSeenNotice && JSON.parse(hasSeenNotice)) return;
		setShowNotice(true);
		localStorage.setItem("hasSeenNotice", JSON.stringify(true));
	}, []);

	return (
		<main className="root-container">
			{notification.show && (
				<Notification
					type={notification.type!}
					message={notification.message!}
					isMobile
				/>
			)}
			{authModal.show && <AuthModal isMobile />}
			{showNotice && <LegalNotice setShowNotice={setShowNotice} isMobile />}
			<Suspense fallback={<FullscreenSpinner />}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/notifications" element={<Notifications />} />
					<Route path="/profile" element={<OwnProfile />} />
					<Route path="/search" element={<Search />} />
					<Route path="/user/:username" element={<Profile />} />
					<Route path="/video/:videoId" element={<Video />} />
					<Route element={<PrivateRoute />}>
						<Route path="/edit-profile" element={<EditProfile />} />
						<Route path="/following" element={<Following />} />
						<Route path="/upload" element={<Upload />} />
					</Route>
				</Routes>
			</Suspense>
			<div id="portal" />
		</main>
	);
}
