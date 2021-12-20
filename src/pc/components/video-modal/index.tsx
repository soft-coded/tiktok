import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import "./video-modal.scss";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { CommentData, VideoData, VideoDynamics } from "../../../common/types";
import {
	joinClasses,
	modifyScrollbar,
	convertToDate
} from "../../../common/utils";
import ActionButton from "../action-button";
import FollowButton from "../follow-button";
import { authModalActions } from "../../store/slices/auth-modal-slice";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import Likes from "./Likes";
import Dropdown from "../dropdown";
import UserDropdown from "../user-dropdown";
import VideoTag from "../video-tag";
import constants from "../../../common/constants";
import { notificationActions } from "../../store/slices/notification-slice";
import {
	getVidComments,
	deleteVideo,
	getCustom
} from "../../../common/api/video";
import LoadingSpinner from "../loading-spinner";

export interface ModalProps extends VideoData {
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	vidDynamics: VideoDynamics;
	handleLike: (hasLiked: boolean) => void;
	handleFollow: (isFollowing: boolean) => void;
	handleCommentsChange: (commentsNum: number) => void;
}

// does not work with plain string, had to use an object instead
const url = { prevURL: "" };

export default function VideoModal(props: ModalProps) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const {
		isAuthenticated: isAuthed,
		username,
		token
	} = useAppSelector(state => state.auth);
	const [comments, setComments] = useState<CommentData[] | null>(null);
	const [showDropdown, setShowDropdown] = useState(false);
	const [showOptions, setShowOptions] = useState(false);
	const isPoster = useMemo(
		() => username === props.uploader!.username,
		[username, props.uploader]
	);
	const curVidId = useMemo(
		() => (props.videoId ? props.videoId : props._id!),
		[props._id, props.videoId]
	);
	const { setShowModal, handleCommentsChange } = props;

	useEffect(() => {
		url.prevURL = window.location.href;
		window.history.replaceState(null, "", "/video/" + curVidId);

		return () => window.history.replaceState(null, "", url.prevURL);
	}, [curVidId]);

	const fetchComments = useCallback(async () => {
		try {
			const res = await getVidComments(curVidId, username);
			setComments(res.data.comments);
		} catch (err: any) {
			dispatch(
				notificationActions.showNotification({
					type: "error",
					message: err.message
				})
			);
			setComments([]);
		}
	}, [dispatch, curVidId, username]);

	const fetchCommentsNum = useCallback(async () => {
		try {
			const res = await getCustom(curVidId, { comments: "num" });
			handleCommentsChange(res.data.comments);
		} catch (err: any) {
			dispatch(
				notificationActions.showNotification({
					type: "error",
					message: "Couldn't fetch number of comments: " + err.message
				})
			);
		}
	}, [curVidId, dispatch, handleCommentsChange]);

	useEffect(() => {
		fetchComments();
	}, [fetchComments]);

	const handleModalClose = useCallback(() => {
		modifyScrollbar("show");
		setShowModal(false);
	}, [setShowModal]);

	function handleAuthModalOpen() {
		dispatch(authModalActions.showModal());
	}

	function showProfile() {
		url.prevURL = "/user/" + props!.uploader!.username;
		navigate("/user/" + props!.uploader!.username);
		handleModalClose();
	}

	function showDD() {
		setShowDropdown(true);
	}

	function hideDD() {
		setShowDropdown(false);
	}

	const delVid = useCallback(async () => {
		try {
			await deleteVideo(curVidId, username!, token!);
			handleModalClose();
			dispatch(
				notificationActions.showNotification({
					type: "success",
					message: "Video deleted"
				})
			);
			navigate("/user/" + username);
		} catch (err: any) {
			dispatch(
				notificationActions.showNotification({
					type: "error",
					message: err.message
				})
			);
		}
	}, [dispatch, curVidId, username, token, handleModalClose, navigate]);

	return (
		<div className="app-video-modal">
			<div className="video-container-wrapper">
				<button className="close-btn" onClick={handleModalClose}>
					<i className="fas fa-times" />
				</button>
				<div className="poster-container" />
				<VideoTag
					className="video-container"
					src={constants.videoLink + "/" + curVidId}
					autoPlay
					controls
				/>
			</div>
			<div className="modal-content">
				<div className="modal-top">
					<header>
						<div
							className="clickable rounded-photo"
							onClick={showProfile}
							onMouseOver={showDD}
							onMouseOut={hideDD}
						>
							<img
								src={constants.pfpLink + "/" + props.uploader!.username}
								alt={props.uploader!.name}
							/>
						</div>
						<div className="names">
							<h3
								className="clickable"
								onClick={showProfile}
								onMouseOver={showDD}
								onMouseOut={hideDD}
							>
								{props.uploader!.username}
							</h3>
							<h4>
								{props.uploader!.name} |&nbsp;
								<span>{convertToDate(props.createdAt!)}</span>
							</h4>
						</div>
						<UserDropdown
							username={props.uploader!.username!}
							onMouseOver={showDD}
							onMouseOut={hideDD}
							showDropdown={showDropdown}
							onFollow={props.handleFollow}
						/>
						<div className="follow-btn">
							{isPoster ? (
								<>
									<i
										className="clickable fas fa-ellipsis-h"
										onClick={() => setShowOptions(true)}
									/>
									{showOptions && (
										<Dropdown
											className="vid-dropdown"
											setShowDropdown={setShowOptions}
										>
											<span className="hoverable" onClick={delVid}>
												<i className="fas fa-trash-alt" /> Delete
											</span>
										</Dropdown>
									)}
								</>
							) : (
								!props.vidDynamics.isFollowing &&
								!isPoster && (
									<div className="follow-btn">
										<FollowButton
											isFollowing={props.vidDynamics.isFollowing}
											onClick={props.handleFollow}
											toFollow={props.uploader!.username!}
											hideUnfollow={true}
										/>
									</div>
								)
							)}
						</div>
					</header>
					<p className="caption">{props.caption}</p>
					<p className="tags">
						{props.tags!.map((tag, i) => (
							<span key={i}>#{tag} </span>
						))}
					</p>
					<h5 className="music">
						<i className="fas fa-music" /> {props.music}
					</h5>
					<div className="action-buttons">
						<Likes
							handleAuthModalOpen={handleAuthModalOpen}
							likes={props.vidDynamics.likesNum}
							curVidId={curVidId}
							hasLiked={props.vidDynamics.hasLiked}
							onClick={props.handleLike}
						/>
						<label htmlFor="comment">
							<ActionButton
								icon={<i className="fas fa-comment-dots" />}
								number={props.vidDynamics.commentsNum}
								className="action-btn-container"
							/>
						</label>
					</div>
				</div>
				<div className={joinClasses("comments", isAuthed ? "container" : "")}>
					{isAuthed ? (
						!comments ? (
							<LoadingSpinner />
						) : (
							comments.map((comment, i) => (
								<Comment
									key={i}
									{...comment}
									handleModalClose={handleModalClose}
									url={url}
									videoId={curVidId}
									setComments={setComments}
									fetchComments={fetchComments}
									fetchCommentsNum={fetchCommentsNum}
								/>
							))
						)
					) : (
						<div className="unauthed">
							<h1>Log in to see comments</h1>
							<h5>Log in to see comments and like the video.</h5>
							<button className="primary-button" onClick={handleAuthModalOpen}>
								Log In
							</button>
							<p>Don't have an account? Sign up</p>
						</div>
					)}
				</div>
				{isAuthed && (
					<CommentForm
						videoId={curVidId}
						fetchComments={fetchComments}
						fetchCommentsNum={fetchCommentsNum}
						setComments={setComments}
					/>
				)}
			</div>
		</div>
	);
}
