import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./profile.scss";
import Container from "../../components/container";
import VideosLayout from "./VideosLayout";
import Sidebar, { suggestedAccounts } from "../../components/sidebar";
import ProfileButtons from "../../components/profile-buttons";
import { useAppDispatch } from "../../../common/store";
import { videoModalActions } from "../../store/slices/video-modal-slice";
import { joinClasses, modifyScrollbar } from "../../../common/utils";
import { getLikedVideos, getUser } from "../../../common/api/user";
import { UserData } from "../../../common/types";
import { notificationActions } from "../../store/slices/notification-slice";
import constants from "../../../common/constants";
import LoadingSpinner from "../../components/loading-spinner";

export default function Profile() {
	const { username } = useParams();
	const dispatch = useAppDispatch();
	const [user, setUser] = useState<UserData | null>(null);
	const [likedVideos, setLikesVideos] = useState<string[] | null>(null);
	const [videosType, setVideosType] = useState<"uploaded" | "liked">(
		"uploaded"
	);
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchData() {
			try {
				if (!username) throw new Error("Invalid URL");
				const res = await getUser(username);
				setUser(res.data);
			} catch (err: any) {
				dispatch(
					notificationActions.showNotification({
						type: "error",
						message: err.message
					})
				);
				navigate("/", { replace: true });
			}
		}
		fetchData();
	}, [username, navigate, dispatch]);

	function handleModalOpen(ind: number) {
		modifyScrollbar("hide");
		dispatch(videoModalActions.showModal({ videoId: user!.videos![ind] }));
	}

	const fetchLikedVids = useCallback(async () => {
		if (!likedVideos) {
			try {
				const liked = await getLikedVideos(username!);
				setLikesVideos(liked.data.videos);
			} catch (err: any) {
				dispatch(
					notificationActions.showNotification({
						type: "error",
						message: err.message
					})
				);
				setVideosType("uploaded");
			}
		}
	}, [username, dispatch, likedVideos]);

	return (
		<Container className="profile-page-container">
			<Sidebar />
			<div className="profile-container">
				{!user ? (
					<LoadingSpinner className="spinner" />
				) : (
					<>
						<header>
							<div className="rounded-photo">
								<img
									src={constants.pfpLink + "/" + user!.username}
									alt={user!.name}
								/>
							</div>
							<div className="names">
								<h1>{user!.username}</h1>
								<h4>{user!.name}</h4>
								<button className="primary-button">Follow</button>
							</div>
						</header>
						<div className="user-details">
							<div className="counts">
								<p>
									<strong>{user!.following}</strong> Following
								</p>
								<p>
									<strong>{user!.followers}</strong> Followers
								</p>
								<p>
									<strong>{user!.totalLikes}</strong>
									{user!.totalLikes! === 1 ? "Like" : "Likes"}
								</p>
							</div>
							<p className="description">{user!.description}</p>
						</div>
						<div className="suggested">
							<h5>
								<span>Suggested accounts</span>
								<span className="see-all">See all</span>
							</h5>
							<div className="account-buttons">
								{suggestedAccounts.slice(0, 3).map((acc, i) => (
									<div key={i} className="acc-btn">
										<div className="rounded-photo">
											<img src={acc.photo} alt={acc.name} />
										</div>
										<h4>{acc.username}</h4>
									</div>
								))}
							</div>
						</div>
						<ProfileButtons
							setVideosType={setVideosType}
							fetchLikedVids={fetchLikedVids}
						/>
						<div
							className={joinClasses(
								"profile-cards-container",
								(videosType === "liked" &&
									(!likedVideos || likedVideos.length === 0)) ||
									(videosType === "uploaded" && user!.videos!.length === 0)
									? "ungrid"
									: ""
							)}
						>
							{videosType === "uploaded" ? (
								<VideosLayout
									videos={user!.videos! as string[]}
									handleModalOpen={handleModalOpen}
								/>
							) : !likedVideos ? (
								<LoadingSpinner className="liked-spinner" />
							) : (
								<VideosLayout
									videos={likedVideos}
									handleModalOpen={handleModalOpen}
								/>
							)}
						</div>
					</>
				)}
			</div>
		</Container>
	);
}
