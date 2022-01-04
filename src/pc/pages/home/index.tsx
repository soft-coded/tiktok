import { useEffect, useState, useCallback } from "react";

import "./home.scss";
import PageWithSidebar from "../../components/page-with-sidebar";
import VideoCard from "../../components/video-card";
import playOnScroll from "../../components/play-on-scroll";
import InfiniteScroll from "react-infinite-scroll-component";
import { VideoData } from "../../../common/types";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { notificationActions } from "../../store/slices/notification-slice";
import { getFeed } from "../../../common/api/feed";
import LoadingSpinner from "../../../common/components/loading-spinner";

export function EndMessage() {
	return (
		<h4 className="scrolled-all">
			<article>
				Wow, can you believe it? You scrolled through all the videos in our
				database!
			</article>
			<span className="clickable" onClick={() => window.scrollTo(0, 0)}>
				Go to top
			</span>
		</h4>
	);
}

export default function Home() {
	const [feed, setFeed] = useState<VideoData[] | null>(null);
	const [hasMoreVids, setHasMoreVids] = useState(true);
	const dispatch = useAppDispatch();
	const username = useAppSelector(state => state.auth.username);

	const fetchFeed = useCallback(
		async (skip?: number) => {
			try {
				const res = await getFeed(username, skip);
				return res.data;
			} catch (err: any) {
				dispatch(
					notificationActions.showNotification({
						type: "error",
						message: err.message
					})
				);
				return { videos: [] };
			}
		},
		[username, dispatch]
	);

	useEffect(() => {
		async function feedFunc() {
			setFeed((await fetchFeed()).videos);
		}
		feedFunc();
	}, [dispatch, username, fetchFeed]);

	useEffect(() => {
		if (!feed) return;
		return playOnScroll("app-video-card");
	}, [feed]);

	const fetchNext = useCallback(async () => {
		const res = await fetchFeed(feed!.length);
		if (res.videos.length > 0) setFeed(prev => [...prev!, ...res.videos]);
		else setHasMoreVids(false);
	}, [feed, fetchFeed]);

	return (
		<PageWithSidebar className="homepage-container">
			<div className="content-container">
				{!feed ? (
					<LoadingSpinner />
				) : (
					<InfiniteScroll
						dataLength={feed.length}
						next={fetchNext}
						hasMore={hasMoreVids}
						loader={<LoadingSpinner />}
						endMessage={<EndMessage />}
						className="infinite-scroll-div"
					>
						{feed.map(video => (
							<VideoCard key={video.videoId} {...video} />
						))}
					</InfiniteScroll>
				)}
			</div>
		</PageWithSidebar>
	);
}
