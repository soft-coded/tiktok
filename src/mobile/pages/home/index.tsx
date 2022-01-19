import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import PageWithNavbar from "../../components/page-with-navbar";
import "./home.scss";
import Swiper from "../../components/swiper";
import Video from "../../components/video";
import Drawer from "../../components/drawer";
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
	const [showDrawer, setShowDrawer] = useState(false);

	useEffect(() => {
		errorNotification(async () => {
			const res = await getFeed(username);
			setFeed(res.data.videos);
		}, dispatch);
	}, [dispatch, username]);

	return (
		<PageWithNavbar containerClassName="homepage-container">
			<header>
				<button className="menu-btn">
					<i className="fas fa-bars" onClick={() => setShowDrawer(true)} />
					{showDrawer && <Drawer setShowDrawer={setShowDrawer} />}
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
				<div className="loader">
					<LoadingSpinner />
				</div>
			) : (
				<Swiper
					slides={feed.map(vid => (
						<Video {...vid} />
					))}
				/>
			)}
		</PageWithNavbar>
	);
}
