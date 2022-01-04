import { useEffect, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./index.scss";
import { useAppSelector } from "../common/store";
import FullscreenSpinner from "../common/components/fullscreen-spinner";
import Header from "./components/header";
import Notification from "./components/notification";
import AuthModal from "./components/auth-modal";
import PrivateRoute from "./components/private-route";
const Home = lazy(() => import("./pages/home"));
const Following = lazy(() => import("./pages/following"));
const Profile = lazy(() => import("./pages/profile"));
const Video = lazy(() => import("./pages/video"));
const Upload = lazy(() => import("./pages/upload"));
const EditProfile = lazy(() => import("./pages/edit-profile"));
const Search = lazy(() => import("./pages/search"));

export default function PCLayout() {
	const { pathname } = useLocation();
	const { notification, authModal } = useAppSelector(state => state.pc);

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
			<Suspense fallback={<FullscreenSpinner />}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/following" element={<Following />} />
					<Route path="/user/:username" element={<Profile />} />
					<Route path="/video/:videoId" element={<Video />} />
					<Route path="/search" element={<Search />} />
					<Route element={<PrivateRoute />}>
						<Route path="/upload" element={<Upload />} />
						<Route path="/edit-profile" element={<EditProfile />} />
					</Route>
				</Routes>
			</Suspense>
		</main>
	);
}
