import { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

import "./navbar.scss";
import { joinClasses } from "../../../common/utils";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { fetchNewNotifs } from "../../store/slices/navbar-slice";

export default function Navbar() {
	const dispatch = useAppDispatch();
	const {
		username,
		token,
		isAuthenticated: isAuthed
	} = useAppSelector(state => state.auth);
	const hasNewNotifs = useAppSelector(
		state => state.mobile.navbar.hasNewNotifs
	);

	useEffect(() => {
		if (!isAuthed) return;
		dispatch(fetchNewNotifs({ username: username!, token: token! }));
	}, [dispatch, isAuthed, username, token]);

	return (
		<nav className="navbar-container">
			<NavLink
				to="/"
				className={({ isActive }) =>
					joinClasses("icon-container", isActive && "active")
				}
			>
				<i className="fas fa-home" />
			</NavLink>
			<NavLink
				to="/search"
				className={({ isActive }) =>
					joinClasses("icon-container", isActive && "active")
				}
			>
				<i className="fas fa-search" />
			</NavLink>
			<Link to="/upload" className="image-container">
				<img
					src="https://lf16-tiktok-web.ttwstatic.com/obj/tiktok-web-us/tiktok/web/node/_next/static/images/create-38e08fcedb8660d05e3c463376e49544.svg"
					alt="create video"
				/>
			</Link>
			<NavLink
				to="/notifications"
				className={({ isActive }) =>
					joinClasses("icon-container", isActive && "active")
				}
			>
				<i className="fas fa-bell">{hasNewNotifs && <span />}</i>
			</NavLink>
			<NavLink
				to="/profile"
				className={({ isActive }) =>
					joinClasses("icon-container", isActive && "active")
				}
			>
				<i className="fas fa-user" />
			</NavLink>
		</nav>
	);
}
