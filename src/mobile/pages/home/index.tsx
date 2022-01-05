import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import "./home.scss";
import Swiper from "../../components/swiper";
import { joinClasses } from "../../../common/utils";
import { VideoData } from "../../../common/types";
import LoadingSpinner from "../../../common/components/loading-spinner";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { errorNotification } from "../../helpers/error-notification";
import { getFeed } from "../../../common/api/feed";

export default function HomePage() {
	const dispatch = useAppDispatch();
	const { username } = useAppSelector(state => state.auth);
	const [feed, setFeed] = useState<VideoData[] | null>(null);

	useEffect(() => {
		errorNotification(async () => {
			// const res = await getFeed(username);
			// setFeed(res.data.videos);
			throw new Error("Not available");
		}, dispatch);
	}, [dispatch, username]);

	return (
		<div className="page-container homepage-container">
			<header>
				<button className="menu-btn">
					<i className="fas fa-bars" />
				</button>
				<nav>
					<NavLink
						to="/following"
						className={({ isActive }) =>
							joinClasses("nav-link", isActive && "active")
						}
					>
						Following
					</NavLink>
					<NavLink
						to="/"
						className={({ isActive }) =>
							joinClasses("nav-link", isActive && "active")
						}
					>
						For You
					</NavLink>
				</nav>
			</header>
			{!feed ? (
				<div className="loader">{/* <LoadingSpinner /> */}</div>
			) : (
				<Swiper slides={[]} />
			)}
		</div>
	);
}
