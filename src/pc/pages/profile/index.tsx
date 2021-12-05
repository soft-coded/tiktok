import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./profile.scss";
import Container from "../../components/container";
import Sidebar, { suggestedAccounts } from "../../components/sidebar";
import ProfileButtons from "../../components/profile-buttons";
import ProfileCard from "../../components/profile-card";
import { useAppDispatch } from "../../../common/store";
import { videoModalActions } from "../../store/slices/video-modal-slice";
import { modifyScrollbar } from "../../../common/utils";
import { getUser } from "../../../common/api/user";
import { UserData } from "../../../common/types";
import { notificationActions } from "../../store/slices/notification-slice";
import constants from "../../../common/constants";
import LoadingSpinner from "../../components/loading-spinner";

let videoInd: number;

export default function Profile() {
	const { username } = useParams();
	const dispatch = useAppDispatch();
	const [user, setUser] = useState<UserData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchData() {
			try {
				if (!username) throw new Error("Invalid URL.");
				const res = await getUser(username);
				setUser(res.data);
				setIsLoading(false);
			} catch (err: any) {
				dispatch(
					notificationActions.showNotification({
						type: "error",
						message: err.message
					})
				);
				// component gets unmounted, no need to change loading state
				navigate("/", { replace: true });
			}
		}
		fetchData();
	}, [username, navigate, dispatch]);

	function handleModalOpen(ind: number) {
		modifyScrollbar("hide");
		videoInd = ind;
		dispatch(
			videoModalActions.showModal({ ...user, video: user!.videos![videoInd] })
		);
	}

	return (
		<Container className="profile-page-container">
			<Sidebar />
			<div className="profile-container">
				{isLoading ? (
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
									<strong>{user!.totalLikes}</strong>&nbsp;
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
						<ProfileButtons />
						<div className="profile-cards-container">
							{user!.videos!.map((video, i) => (
								<ProfileCard
									key={i}
									index={i}
									video={constants.videoLink + "/" + video}
									handleModalOpen={handleModalOpen}
								/>
							))}
						</div>
					</>
				)}
			</div>
		</Container>
	);
}
