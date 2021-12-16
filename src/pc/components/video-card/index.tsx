import { useState, Suspense, lazy } from "react";
import { Link } from "react-router-dom";

import "./video-card.scss";
import ActionButton from "../action-button";
import FollowButton from "../follow-button";
import Likes from "../video-modal/Likes";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { modifyScrollbar, convertToDate } from "../../../common/utils";
import { VideoData } from "../../../common/types";
import CardDropdown from "../user-dropdown";
import constants from "../../../common/constants";
import { authModalActions } from "../../store/slices/auth-modal-slice";
import FullscreenSpinner from "../fullscreen-spinner";
const VideoModal = lazy(() => import("../video-modal"));

export default function VideoCard(props: VideoData) {
	const dispatch = useAppDispatch();
	const [showVideoModal, setShowVideoModal] = useState(false);
	const [showProfileDD, setShowProfileDD] = useState(false);
	const loggedInAs = useAppSelector(state => state.auth.username);
	const [isFollowing, setIsFollowing] = useState(props.isFollowing);
	const [vidDynamics, setVidDynamics] = useState({
		hasLiked: props.hasLiked!,
		likesNum: props.likes!,
		commentsNum: props.comments as number,
		isFollowing: props.isFollowing
	});

	function handleModalOpen() {
		modifyScrollbar("hide");
		setShowVideoModal(true);
	}

	function handleAuthModalOpen() {
		modifyScrollbar("hide");
		dispatch(authModalActions.showModal());
	}

	function handleLike(hasLiked: boolean) {
		setVidDynamics(prev => ({
			...prev,
			hasLiked,
			likesNum: hasLiked ? prev.likesNum + 1 : prev.likesNum - 1
		}));
	}

	function showDD() {
		setShowProfileDD(true);
	}

	function hideDD() {
		setShowProfileDD(false);
	}

	return (
		<div className="app-video-card">
			{showVideoModal && (
				<Suspense fallback={<FullscreenSpinner />}>
					<VideoModal
						{...props}
						setShowModal={setShowVideoModal}
						vidDynamics={vidDynamics}
						setVidDynamics={setVidDynamics}
						handleLike={handleLike}
					/>
				</Suspense>
			)}
			<div className="profile-pic">
				<Link to={"/user/" + props.uploader!.username}>
					<div
						className="rounded-photo"
						onMouseOver={showDD}
						onMouseOut={hideDD}
					>
						<img
							src={constants.pfpLink + "/" + props.uploader!.username}
							alt={props.uploader!.name}
						/>
					</div>
				</Link>
				<CardDropdown
					username={props.uploader!.username!}
					showDropdown={showProfileDD}
					onMouseOver={showDD}
					onMouseOut={hideDD}
					onFollow={setIsFollowing}
				/>
			</div>
			<div className="card-content">
				<header>
					<div className="uploader">
						<Link to={"/user/" + props.uploader!.username} className="username">
							<h4 onMouseOver={showDD} onMouseOut={hideDD}>
								{props.uploader!.username}
							</h4>
						</Link>
						<h5>
							{props.uploader!.name} |
							<span>
								&nbsp;
								{convertToDate(props.createdAt!)}
							</span>
						</h5>
					</div>
					{!isFollowing && loggedInAs !== props.uploader!.username && (
						<div className="follow-btn">
							<FollowButton
								isFollowing={isFollowing}
								toFollow={props.uploader!.username!}
								onClick={setIsFollowing}
								hideUnfollow={true}
							/>
						</div>
					)}
				</header>
				<p className="caption">{props.caption}</p>
				<p className="tags">
					{props.tags!.map((tag, i) => (
						<span key={i}>#{tag} </span>
					))}
				</p>
				<p className="music">
					<i className="fas fa-music" /> {props.music}
				</p>
				<div className="card-video">
					<div className="video-container">
						<video
							src={constants.videoLink + "/" + props.videoId}
							playsInline
							muted
							autoPlay
							onClick={handleModalOpen}
						>
							Your browser does not support videos.
						</video>
					</div>
					<div className="action-buttons">
						<Likes
							likes={vidDynamics.likesNum}
							curVidId={props.videoId!}
							handleAuthModalOpen={handleAuthModalOpen}
							hasLiked={vidDynamics.hasLiked}
							onClick={handleLike}
						/>
						<ActionButton
							icon={<i className="fas fa-comment-dots" />}
							number={vidDynamics.commentsNum}
							className="action-btn-container"
						/>
						<ActionButton
							icon={<i className="fas fa-share" />}
							number={props.shares as number}
							className="action-btn-container"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
