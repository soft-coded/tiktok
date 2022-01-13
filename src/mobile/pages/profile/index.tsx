import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import "./profile.scss";
import { UserData } from "../../../common/types";
import constants from "../../../common/constants";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { errorNotification } from "../../helpers/error-notification";
import { getLikedVideos, getUser } from "../../../common/api/user";
import LoadingSpinner from "../../../common/components/loading-spinner";
import { joinClasses } from "../../../common/utils";
import ProfileVideo from "../../components/profile-video";
import { notificationActions } from "../../../common/store/slices/notification-slice";

interface Props {
	isOwn?: boolean;
}

export default function Profile({ isOwn }: Props) {
	const { username } = useParams();
	const dispatch = useAppDispatch();
	const loggedInAs = useAppSelector(state => state.auth.username);
	const [user, setUser] = useState<UserData | null>();
	const [videosType, setVideosType] = useState<"uploaded" | "liked">(
		"uploaded"
	);
	const [likedVideos, setLikedVideos] = useState<string[] | null>(null);

	useEffect(() => {
		errorNotification(
			async () => {
				const res = await getUser(isOwn ? loggedInAs! : username!, loggedInAs);
				delete res.data.success;
				setUser(res.data);
			},
			dispatch,
			null,
			"Couldn't load profile:"
		);
	}, [username, dispatch, loggedInAs, isOwn]);

	const fetchLikedVids = useCallback(() => {
		errorNotification(
			async () => {
				const res = await getLikedVideos(isOwn ? loggedInAs! : username!);
				setLikedVideos(res.data.videos);
			},
			dispatch,
			() => setLikedVideos([]),
			"Couldn't load liked videos:"
		);
	}, [dispatch, username, isOwn, loggedInAs]);

	const changeVidType = useCallback(() => {
		if (videosType === "uploaded") {
			if (!likedVideos) fetchLikedVids();
			setVideosType("liked");
			return;
		}
		setVideosType("uploaded");
	}, [videosType, fetchLikedVids, likedVideos]);

	function shareProfile() {
		errorNotification(
			async () => {
				await navigator.clipboard.writeText(
					window.location.origin + "/user/" + username
				);
				dispatch(
					notificationActions.showNotification({
						type: "success",
						message: "Profile link copied to clipboard"
					})
				);
			},
			dispatch,
			null,
			"Couldn't copy profile link to clipboard:"
		);
	}

	return (
		<div className="profile-page">
			{!user ? (
				<LoadingSpinner />
			) : (
				<>
					<div className="profile-header">
						<header>
							<div />
							<h4>{user.name}</h4>
							<div>
								{isOwn ? (
									<i className="fas fa-ellipsis-h" />
								) : (
									<i className="fas fa-share" onClick={shareProfile} />
								)}
							</div>
						</header>
						<div className="user-info">
							<div className="rounded-photo">
								<img
									src={constants.pfpLink + "/" + user.username}
									alt={user.name}
								/>
							</div>
							<h4>@{user.username}</h4>
							<ul>
								<li className="show-divider">
									<strong>{user.following}</strong>
									<span>Following</span>
								</li>
								<li className="show-divider">
									<strong>{user.followers}</strong>
									<span>{user.followers === 1 ? "Follower" : "Followers"}</span>
								</li>
								<li>
									<strong>{user.totalLikes}</strong>
									<span>{user.totalLikes === 1 ? "Like" : "Likes"}</span>
								</li>
							</ul>
							{!isOwn &&
								(user.isFollowing ? (
									<button className="secondary-button">Following</button>
								) : (
									<button className="primary-button">Follow</button>
								))}
							<p className="break-word description">{user.description}</p>
						</div>
					</div>
					<div className="video-buttons">
						<button
							className={videosType === "uploaded" ? "active" : undefined}
							onClick={changeVidType}
						>
							<i className="fas fa-video" />
						</button>
						<button
							className={videosType === "liked" ? "active" : undefined}
							onClick={changeVidType}
						>
							<i className="fas fa-heart" />
						</button>
					</div>
					<div
						className={joinClasses(
							"videos-container",
							videosType === "uploaded" &&
								user.videos!.length === 0 &&
								"ungrid",
							videosType === "liked" &&
								(!likedVideos || likedVideos.length === 0) &&
								"ungrid"
						)}
					>
						{videosType === "uploaded" ? (
							user.videos!.length > 0 ? (
								user.videos!.map((vid, i) => (
									<ProfileVideo key={i} video={vid as string} />
								))
							) : (
								<div className="no-videos">No videos</div>
							)
						) : !likedVideos ? (
							<LoadingSpinner />
						) : likedVideos.length > 0 ? (
							likedVideos.map((vid, i) => (
								<ProfileVideo key={i} video={vid as string} />
							))
						) : (
							<div className="no-videos">No videos</div>
						)}
					</div>
				</>
			)}
		</div>
	);
}
