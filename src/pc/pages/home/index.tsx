import { useEffect, useState } from "react";

import "./home.scss";
import Container from "../../components/container";
import Sidebar from "../../components/sidebar";
import VideoCard from "../../components/video-card";
import { VideoData } from "../../../common/types";
import { useAppDispatch } from "../../../common/store";
import { notificationActions } from "../../store/slices/notification-slice";
import { getFeed } from "../../../common/api/feed";
import LoadingSpinner from "../../components/loading-spinner";

export default function Home() {
	const [feed, setFeed] = useState<VideoData[] | null>(null);
	const dispatch = useAppDispatch();

	useEffect(() => {
		async function fetchFeed() {
			try {
				const res = await getFeed();
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
	}, [dispatch]);

	return (
		<Container className="homepage-container">
			<Sidebar />
			<div className="content-container">
				{!feed ? (
					<LoadingSpinner />
				) : (
					feed.map(video => <VideoCard key={video.videoId} {...video} />)
				)}
			</div>
		</Container>
	);
}
