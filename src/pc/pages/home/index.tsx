import { useEffect, useState } from "react";

import "./home.scss";
import PageWithSidebar from "../../components/page-with-sidebar";
import VideoCard from "../../components/video-card";
import { VideoData } from "../../../common/types";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { notificationActions } from "../../store/slices/notification-slice";
import { getFeed } from "../../../common/api/feed";
import LoadingSpinner from "../../components/loading-spinner";

export default function Home() {
	const [feed, setFeed] = useState<VideoData[] | null>(null);
	const dispatch = useAppDispatch();
	const username = useAppSelector(state => state.auth.username);

	useEffect(() => {
		async function fetchFeed() {
			try {
				const res = await getFeed(username);
				setFeed(res.data.videos);
			} catch (err: any) {
				dispatch(
					notificationActions.showNotification({
						type: "error",
						message: err.message
					})
				);
				setFeed([]);
			}
		}
		fetchFeed();
	}, [dispatch, username]);

	return (
		<PageWithSidebar className="homepage-container">
			<div className="content-container">
				{!feed ? (
					<LoadingSpinner />
				) : (
					feed.map(video => <VideoCard key={video.videoId} {...video} />)
				)}
			</div>
		</PageWithSidebar>
	);
}
