import React, { useState, Suspense, lazy, useCallback, useRef } from "react";
import { Link } from "react-router-dom";

import "./video-card.scss";
import useVideoDynamics, { videoDynamicsActions } from "./useVideoDynamics";
import ActionButton from "../action-button";
import FollowButton from "../follow-button";
import Likes from "../video-modal/Likes";
import VideoTag from "../video-tag";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { modifyScrollbar, convertToDate } from "../../../common/utils";
import { VideoData } from "../../../common/types";
import CardDropdown from "../user-dropdown";
import constants from "../../../common/constants";
import { authModalActions } from "../../store/slices/auth-modal-slice";
import FullscreenSpinner from "../../../common/components/fullscreen-spinner";
import { share } from "../../../common/api/video";
import { notificationActions } from "../../store/slices/notification-slice";
const VideoModal = lazy(() => import("../video-modal"));

export default function VideoCard(props: VideoData) {
	const dispatch = useAppDispatch();
	const cardRef = useRef<HTMLDivElement>(null);
	const [showVideoModal, setShowVideoModal] = useState(false);
	const [showProfileDD, setShowProfileDD] = useState(false);
	const loggedInAs = useAppSelector(state => state.auth.username);
	const [vidDynamics, vidDispatch] = useVideoDynamics({
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

	const handleLike = useCallback(
		(hasLiked: boolean) => {
			vidDispatch({ type: videoDynamicsActions.LIKED, hasLiked });
		},
		[vidDispatch]
	);

	const handleFollow = useCallback(
		(isFollowing: boolean) => {
			vidDispatch({ type: videoDynamicsActions.FOLLOWED, isFollowing });
		},
		[vidDispatch]
	);

	const handleCommentsChange = useCallback(
		(commentsNum: number) => {
			vidDispatch({ type: videoDynamicsActions.COMMENTED, commentsNum });
		},
		[vidDispatch]
	);

	const handleShare = useCallback(async () => {
		try {
			await share(props.videoId!);
			await navigator.clipboard.writeText(
				window.location.origin + "/video/" + props.videoId
			);
			dispatch(
				notificationActions.showNotification({
					type: "success",
					message: "Video link copied to clipboard"
				})
			);
		} catch (err: any) {
			dispatch(
				notificationActions.showNotification({
					type: "error",
					message: err.message
				})
			);
		}
	}, [dispatch, props.videoId]);

	function showDD() {
		setShowProfileDD(true);
	}

	function hideDD() {
		setShowProfileDD(false);
	}

	return (
		<div className="app-video-card" ref={cardRef}>
			{showVideoModal && (
				<Suspense fallback={<FullscreenSpinner />}>
					<VideoModal
						{...props}
						setShowModal={setShowVideoModal}
						vidDynamics={vidDynamics}
						handleLike={handleLike}
						handleFollow={handleFollow}
						handleCommentsChange={handleCommentsChange}
						handleShare={handleShare}
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
					onFollow={handleFollow}
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
					{!vidDynamics.isFollowing && loggedInAs !== props.uploader!.username && (
						<div className="follow-btn">
							<FollowButton
								isFollowing={vidDynamics.isFollowing}
								toFollow={props.uploader!.username!}
								onClick={handleFollow}
								hideUnfollow={true}
							/>
						</div>
					)}
				</header>
				<p className="caption">{props.caption}</p>
				<p className="tags">
					{props.tags!.map((tag, i) => (
						<React.Fragment key={i}>
							<Link to={"/search?query=" + tag + "&send=videos"}>#{tag}</Link>
							&nbsp;
						</React.Fragment>
					))}
				</p>
				<p className="music">
					<i className="fas fa-music" /> {props.music}
				</p>
				<div className="card-video">
					<VideoTag
						className="video-container"
						src={constants.videoLink + "/" + props.videoId}
						muted
						controls
						onClick={handleModalOpen}
					/>
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
							onClick={handleShare}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
