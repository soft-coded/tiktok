import { useEffect, Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import "./index.scss";
import Navbar from "./components/navbar";
import FullscreenSpinner from "../common/components/fullscreen-spinner";
const Home = lazy(() => import("./pages/home"));

export default function MobileLayout() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<main className="page-container">
			<Suspense fallback={<FullscreenSpinner />}>
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</Suspense>
			<Navbar />
		</main>
	);
}
