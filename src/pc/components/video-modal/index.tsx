import { useState, useEffect, useCallback } from "react";
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
import constants from "../../../common/constants";
import { notificationActions } from "../../store/slices/notification-slice";
import { getVideo, getVidComments } from "../../../common/api/video";
import LoadingSpinner from "../loading-spinner";

export interface ModalProps extends VideoData {
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function VideoModal(props: ModalProps) {
	const dispatch = useAppDispatch();
	const isAuthed = useAppSelector(state => state.auth.isAuthenticated);
	const [videoData, setVideoData] = useState<VideoData | null>(() =>
		props.uploader ? props : null
	);
	const [comments, setComments] = useState<CommentData[] | null>(null);

	const handleModalClose = useCallback(() => {
		modifyScrollbar("show");
		dispatch(videoModalActions.hideModal());
	}, [dispatch]);

	const fetchComments = useCallback(async () => {
		try {
			const res = await getVidComments(
				props.video ? props.video : props.videoId ? props.videoId : props._id!
			);
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
	}, [props.videoId, props._id, props.video, dispatch]);

	useEffect(() => {
		async function fetchVid() {
			try {
				const res = await getVideo(props.videoId!);
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
		}
		if (!videoData) fetchVid();
		fetchComments();
	}, [videoData, dispatch, props.videoId, handleModalClose, fetchComments]);

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
										src={constants.pfpLink + "/" + props.uploader!.username}
										alt={props.uploader!.name}
									/>
								</div>
								<div className="names">
									<h3>{props.uploader!.username}</h3>
									<h4>
										{props.uploader!.name} |&nbsp;
										<span>{convertToDate(props.createdAt!)}</span>
									</h4>
								</div>
								<div className="follow-btn">
									<button>Follow</button>
								</div>
							</header>
							<p className="caption">{props.caption}</p>
							<h5 className="music">
								<i className="fas fa-music" /> {props.music}
							</h5>
							<div className="action-buttons">
								<ActionButton
									icon={<i className="fas fa-heart" />}
									number={props.likes as number}
									className="action-btn-container"
								/>
								<ActionButton
									icon={<i className="fas fa-comment-dots" />}
									number={props.comments as number}
									className="action-btn-container"
								/>
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
							<div className="post-comment">
								<input type="text" placeholder="Add a comment" />
								<button>Post</button>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
}
