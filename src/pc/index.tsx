import { Routes, Route } from "react-router";

import "./index.scss";
import Header from "./components/header";
import Home from "./pages/home";

export default function PCLayout() {
	return (
		<main className="page-container">
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</main>
	);
}
