import { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";

import "./video-modal.scss";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { CommentData, VideoData } from "../../../common/types";
import {
	joinClasses,
	modifyScrollbar,
	convertToDate
} from "../../../common/utils";
import ActionButton from "../action-button";
import { videoModalActions } from "../../store/slices/video-modal-slice";
import { authModalActions } from "../../store/slices/auth-modal-slice";
import Comment from "./Comment";
import AddComment from "./AddComment";
import Likes from "./Likes";
import constants from "../../../common/constants";
import { notificationActions } from "../../store/slices/notification-slice";
import { getVideo, getVidComments } from "../../../common/api/video";
import LoadingSpinner from "../loading-spinner";

export interface ModalProps extends VideoData {
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function VideoModal(props: ModalProps) {
	const dispatch = useAppDispatch();
	const { isAuthenticated: isAuthed, username } = useAppSelector(
		state => state.auth
	);
	const [videoData, setVideoData] = useState<VideoData | null>(null);
	const [comments, setComments] = useState<CommentData[] | null>(null);
	const curVidId = useMemo(
		() =>
			props.video ? props.video : props.videoId ? props.videoId : props._id!,
		[props.video, props._id, props.videoId]
	);

	const handleModalClose = useCallback(() => {
		modifyScrollbar("show");
		dispatch(videoModalActions.hideModal());
	}, [dispatch]);

	const fetchComments = useCallback(async () => {
		try {
			const res = await getVidComments(curVidId);
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
	}, [dispatch, curVidId]);

	const fetchVid = useCallback(async () => {
		try {
			const res = await getVideo(curVidId, username ? username : undefined);
			setVideoData(res.data);
		} catch (err: any) {
			dispatch(
				notificationActions.showNotification({
					type: "error",
					message: err.message
				})
			);
			handleModalClose();
		}
	}, [curVidId, dispatch, handleModalClose, username]);

	useEffect(() => {
		fetchVid();
		fetchComments();
	}, [fetchVid, fetchComments]);

	function handleAuthModalOpen() {
		dispatch(authModalActions.showModal());
	}

	return (
		<div className="app-video-modal">
			<div className="video-container-wrapper">
				<button className="close-btn" onClick={handleModalClose}>
					<i className="fas fa-times" />
				</button>
				<div className="poster-container" />
				<div className="video-container">
					<video
						src={
							constants.videoLink +
							"/" +
							(props.video
								? props.video
								: props.videoId
								? props.videoId
								: props._id)
						}
						playsInline
						autoPlay
						controls
					>
						Your browser does not support videos.
					</video>
				</div>
			</div>
			<div className="modal-content">
				{!videoData ? (
					<LoadingSpinner />
				) : (
					<>
						<div className="modal-top">
							<header>
								<div className="rounded-photo">
									<img
										src={constants.pfpLink + "/" + videoData.uploader!.username}
										alt={videoData.uploader!.name}
									/>
								</div>
								<div className="names">
									<h3>{videoData.uploader!.username}</h3>
									<h4>
										{videoData.uploader!.name} |&nbsp;
										<span>{convertToDate(videoData.createdAt!)}</span>
									</h4>
								</div>
								<div className="follow-btn">
									<button>Follow</button>
								</div>
							</header>
							<p className="caption">{videoData.caption}</p>
							<p className="tags">
								{videoData.tags!.map((tag, i) => (
									<span key={i}>#{tag} </span>
								))}
							</p>
							<h5 className="music">
								<i className="fas fa-music" /> {videoData.music}
							</h5>
							<div className="action-buttons">
								<Likes
									handleAuthModalOpen={handleAuthModalOpen}
									likes={videoData.likes!}
									curVidId={curVidId}
									hasLiked={videoData.hasLiked}
								/>
								<label htmlFor="comment">
									<ActionButton
										icon={<i className="fas fa-comment-dots" />}
										number={videoData.comments as number}
										className="action-btn-container"
									/>
								</label>
							</div>
						</div>
						<div
							className={joinClasses("comments", isAuthed ? "container" : "")}
						>
							{isAuthed ? (
								!comments ? (
									<LoadingSpinner />
								) : (
									comments.map((comment, i) => <Comment key={i} {...comment} />)
								)
							) : (
								<div className="unauthed">
									<h1>Log in to see comments</h1>
									<h5>Log in to see comments and like the video.</h5>
									<button
										className="primary-button"
										onClick={handleAuthModalOpen}
									>
										Log In
									</button>
									<p>
										Don't have an account? <Link to="/signup">Sign up</Link>
									</p>
								</div>
							)}
						</div>
						{isAuthed && (
							<AddComment
								videoId={curVidId}
								fetchComments={fetchComments}
								setComments={setComments}
							/>
						)}
					</>
				)}
			</div>
		</div>
	);
}
