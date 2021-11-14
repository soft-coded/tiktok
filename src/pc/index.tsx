import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router";

import "./index.scss";
import FullscreenSpinner from "./components/fullscreen-spinner";
import Header from "./components/header";
import Home from "./pages/home";
const Profile = lazy(() => import("./pages/profile"));

export default function PCLayout() {
	return (
		<main className="page-container">
			<Header />
			<Suspense fallback={<FullscreenSpinner />}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/user/:username" element={<Profile />} />
				</Routes>
			</Suspense>
		</main>
	);
}
