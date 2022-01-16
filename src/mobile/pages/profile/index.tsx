import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";

import "./profile.scss";
import PageWithNavbar from "../../components/page-with-navbar";
import { UserData } from "../../../common/types";
import constants from "../../../common/constants";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { errorNotification } from "../../helpers/error-notification";
import { followUser, getLikedVideos, getUser } from "../../../common/api/user";
import LoadingSpinner from "../../../common/components/loading-spinner";
import { joinClasses } from "../../../common/utils";
import ProfileVideo from "../../components/profile-video";
import { notificationActions } from "../../../common/store/slices/notification-slice";

interface Props {
	isOwn?: boolean;
}

type FollowData = {
	isFollowing: boolean | undefined;
	totalFollowers: number;
};

export default function Profile({ isOwn }: Props) {
	const { username } = useParams();
	const dispatch = useAppDispatch();
	const loggedInAs = useAppSelector(state => state.auth.username);
	const [user, setUser] = useState<UserData | null>();
	const [videosType, setVideosType] = useState<"uploaded" | "liked">(
		"uploaded"
	);
	const [likedVideos, setLikedVideos] = useState<string[] | null>(null);
	const [followData, setFollowData] = useState<FollowData>({
		isFollowing: false,
		totalFollowers: 0
	});

	useEffect(() => {
		errorNotification(
			async () => {
				const res = await getUser(isOwn ? loggedInAs! : username!, loggedInAs);
				delete res.data.success;
				setUser(res.data);
				setFollowData({
					isFollowing: res.data.isFollowing || false,
					totalFollowers: res.data.followers
				});
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

	const handleFollow = useCallback(() => {
		errorNotification(
			async () => {
				if (!loggedInAs) throw new Error("Log in to continue");
				const res = await followUser(username!, loggedInAs);
				setFollowData(prev => ({
					isFollowing: res.data.followed,
					totalFollowers: prev.totalFollowers + (res.data.followed ? 1 : -1)
				}));
				dispatch(
					notificationActions.showNotification({
						type: "success",
						message: res.data.followed
							? "You started following " + username
							: "You unfollowed " + username
					})
				);
			},
			dispatch,
			null,
			"Couldn't follow " + username + ":"
		);
	}, [dispatch, loggedInAs, username]);

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
		<PageWithNavbar containerClassName="profile-page">
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
									<Link to="/edit-profile">
										<i className="fas fa-cog" />
									</Link>
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
									<strong>{followData.totalFollowers}</strong>
									<span>
										{followData.totalFollowers === 1 ? "Follower" : "Followers"}
									</span>
								</li>
								<li>
									<strong>{user.totalLikes}</strong>
									<span>{user.totalLikes === 1 ? "Like" : "Likes"}</span>
								</li>
							</ul>
							{!isOwn &&
								loggedInAs !== username &&
								(followData.isFollowing ? (
									<button className="secondary-button" onClick={handleFollow}>
										Following
									</button>
								) : (
									<button className="primary-button" onClick={handleFollow}>
										Follow
									</button>
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
		</PageWithNavbar>
	);
}
