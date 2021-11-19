import { useEffect } from "react";
import { useDispatch } from "react-redux";

import PCLayout from "./pc";
import "./common/styles.scss";
import { authActions } from "./common/store/slices/auth";

export default function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const username = localStorage.getItem("username");
		if (username) dispatch(authActions.login({ username }));
	}, [dispatch]);

	return <PCLayout />;
}
