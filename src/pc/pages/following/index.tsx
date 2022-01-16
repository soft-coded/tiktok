import { useState, useEffect, useCallback } from "react";

import "./following.scss";
import PageWithSidebar from "../../components/page-with-sidebar";
import LoadingSpinner from "../../../common/components/loading-spinner";
import VideoCard from "../../components/video-card";
import SuggestionCard from "../../components/suggestion-card";
import InfiniteScroll from "react-infinite-scroll-component";
import { EndMessage } from "../home";
import playOnScroll from "../../components/play-on-scroll";
import { useAppSelector, useAppDispatch } from "../../../common/store";
import { getFollowingVids, getSuggested } from "../../../common/api/feed";
import { UserData, VideoData } from "../../../common/types";
import { notificationActions } from "../../../common/store/slices/notification-slice";
import { joinClasses } from "../../../common/utils";

// should always match the "followingLimit" in the backend
const skipValue = 5;
let skip = skipValue * 2;

export default function Following() {
	const dispatch = useAppDispatch();
	const { isAuthenticated: isAuthed, username } = useAppSelector(
		state => state.auth
	);
	const [hasMoreVids, setHasMoreVids] = useState(true);
	const [videos, setVideos] = useState<VideoData[] | null>(null);
	const [suggestions, setSuggestions] = useState<UserData[] | null>(null);
	const [showVideos, setShowVideos] = useState(true);

	const fetchVids = useCallback(
		async (skip?: number) => {
			try {
				const res = await getFollowingVids(username!, skip);
				return res.data;
			} catch (err: any) {
				dispatch(
					notificationActions.showNotification({
						type: "error",
						message: err.message
					})
				);
			}
		},
		[username, dispatch]
	);

	useEffect(() => {
		if (!isAuthed) {
			setShowVideos(false);
			return;
		}
		async function fetchFunc() {
			const res = await fetchVids();
			if (res.videos.length === 0) setShowVideos(false);
			else setVideos(res.videos);
		}
		fetchFunc();
	}, [dispatch, isAuthed, fetchVids]);

	useEffect(() => {
		if (!videos) return;
		return playOnScroll("app-video-card");
	}, [videos]);

	useEffect(() => {
		if (showVideos) return;
		async function fetchSuggestions() {
			try {
				const res = await getSuggested();
				setSuggestions(res.data.users);
			} catch (err: any) {
				dispatch(
					notificationActions.showNotification({
						type: "error",
						message: err.message
					})
				);
			}
		}
		fetchSuggestions();
	}, [isAuthed, dispatch, showVideos]);

	const fetchNext = useCallback(async () => {
		const res = await fetchVids(skip);
		skip += skipValue;
		if (res.videos.length > 0) setVideos(prev => [...prev!, ...res.videos]);
		else setHasMoreVids(false);
	}, [fetchVids]);

	return (
		<PageWithSidebar className="following-container">
			{showVideos ? (
				<div className="cards-container">
					{!videos ? (
						<LoadingSpinner />
					) : (
						<InfiniteScroll
							dataLength={videos.length}
							next={fetchNext}
							hasMore={hasMoreVids}
							loader={<LoadingSpinner />}
							endMessage={<EndMessage />}
							className="infinite-scroll-div"
						>
							{videos.map((vid, i) => (
								<VideoCard key={i} {...vid} isFollowing />
							))}
						</InfiniteScroll>
					)}
				</div>
			) : (
				<div
					className={joinClasses(
						"suggested-container",
						!suggestions && "ungrid"
					)}
				>
					{!suggestions ? (
						<LoadingSpinner className="spinner" />
					) : (
						suggestions.map((user, i) => <SuggestionCard key={i} {...user} />)
					)}
				</div>
			)}
		</PageWithSidebar>
	);
}
