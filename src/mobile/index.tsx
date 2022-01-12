import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import "./index.scss";
import Navbar from "./components/navbar";
import Notification from "../common/components/notification";
import FullscreenSpinner from "../common/components/fullscreen-spinner";
import { useAppSelector } from "../common/store";
import AuthModal from "../common/components/auth-modal";
const Home = lazy(() => import("./pages/home"));
const Profile = lazy(() => import("./pages/profile"));
const OwnProfile = lazy(() => import("./pages/profile/OwnProfile"));

export default function MobileLayout() {
	const { notification, authModal } = useAppSelector(state => state);

	return (
		<main className="root-container">
			{notification.show && (
				<Notification
					type={notification.type!}
					message={notification.message!}
					isMobile={true}
				/>
			)}
			{authModal.show && <AuthModal isMobile={true} />}
			<Suspense fallback={<FullscreenSpinner />}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profile" element={<OwnProfile />} />
					<Route path="/user/:username" element={<Profile />} />
				</Routes>
			</Suspense>
			<Navbar />
			<div id="portal" />
		</main>
	);
}
