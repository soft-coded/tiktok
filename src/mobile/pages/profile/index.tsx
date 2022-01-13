import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./profile.scss";
import { UserData } from "../../../common/types";
import constants from "../../../common/constants";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { errorNotification } from "../../helpers/error-notification";
import { getUser } from "../../../common/api/user";
import LoadingSpinner from "../../../common/components/loading-spinner";
import { joinClasses } from "../../../common/utils";
import ProfileVideo from "../../components/profile-video";

interface Props {
	isOwn?: boolean;
}

export default function Profile({ isOwn }: Props) {
	const { username } = useParams();
	const dispatch = useAppDispatch();
	const [user, setUser] = useState<UserData | null>();
	const loggedInAs = useAppSelector(state => state.auth.username);
	const [videosType, setVideosType] = useState<"uploaded" | "liked">(
		"uploaded"
	);

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
								<i
									className={joinClasses(
										"fas",
										isOwn ? "fa-ellipsis-h" : "fa-share"
									)}
								/>
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
							{!isOwn && <button className="primary-button">Follow</button>}
							<p className="break-word description">{user.description}</p>
						</div>
					</div>
					<div className="video-buttons">
						<button
							className={videosType === "uploaded" ? "active" : undefined}
						>
							<i className="fas fa-video" />
						</button>
						<button className={videosType === "liked" ? "active" : undefined}>
							<i className="fas fa-heart" />
						</button>
					</div>
					<div className="videos-container">
						{user.videos!.map((vid, i) => (
							<ProfileVideo key={i} video={vid as string} />
						))}
					</div>
				</>
			)}
		</div>
	);
}
