import { useState, useEffect } from "react";

import "./following.scss";
import PageWithSidebar from "../../components/page-with-sidebar";
import LoadingSpinner from "../../components/loading-spinner";
import VideoCard from "../../components/video-card";
import SuggestionCard from "../../components/suggestion-card";
import { useAppSelector, useAppDispatch } from "../../../common/store";
import { getFollowingVids, getSuggested } from "../../../common/api/feed";
import { UserData, VideoData } from "../../../common/types";
import { notificationActions } from "../../store/slices/notification-slice";
import { joinClasses } from "../../../common/utils";

export default function Following() {
	const dispatch = useAppDispatch();
	const { isAuthenticated: isAuthed, username } = useAppSelector(
		state => state.auth
	);
	const [videos, setVideos] = useState<VideoData[] | null>(null);
	const [suggestions, setSuggestions] = useState<UserData[] | null>(null);
	const [showVideos, setShowVideos] = useState(true);

	useEffect(() => {
		if (!isAuthed) {
			setShowVideos(false);
			return;
		}
		async function fetchVids() {
			try {
				const res = await getFollowingVids(username!);
				if (res.data.videos.length === 0) setShowVideos(false);
				else setVideos(res.data.videos);
			} catch (err: any) {
				dispatch(
					notificationActions.showNotification({
						type: "error",
						message: err.message
					})
				);
			}
		}
		fetchVids();
	}, [dispatch, username, isAuthed]);

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

	return (
		<PageWithSidebar className="following-container">
			{showVideos ? (
				<div className="cards-container">
					{!videos ? (
						<LoadingSpinner />
					) : (
						videos.map((vid, i) => (
							<VideoCard key={i} {...vid} isFollowing={true} />
						))
					)}
				</div>
			) : (
				<div
					className={joinClasses(
						"suggested-container",
						!suggestions ? "ungrid" : ""
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
