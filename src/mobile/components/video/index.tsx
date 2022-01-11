import { useState, useEffect, useRef, useCallback } from "react";

import "./video.scss";
import LoadingSpinner from "../../../common/components/loading-spinner";
import CommentsModal from "../comments-modal";
import { VideoData } from "../../../common/types";
import constants from "../../../common/constants";
import { errorNotification } from "../../helpers/error-notification";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { notificationActions } from "../../../common/store/slices/notification-slice";
import { likeVideo, share } from "../../../common/api/video";
import { joinClasses } from "../../../common/utils";

type LikesInfo = {
	hasLiked: boolean;
	likesNum: number;
};

export default function Video(props: VideoData) {
	const dispatch = useAppDispatch();
	const { isAuthenticated: isAuthed, username } = useAppSelector(
		state => state.auth
	);
	const cancelClickRef = useRef(false);
	const videoRef = useRef<HTMLVideoElement>(null);
	const albumRef = useRef<HTMLDivElement>(null);
	const musicRef = useRef<HTMLDivElement>(null);
	const infoDivRef = useRef<HTMLDivElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [showSpinner, setShowSpinner] = useState(true);
	const [showComments, setShowComments] = useState(false);
	const [likesInfo, setLikesInfo] = useState<LikesInfo>({
		hasLiked: props.hasLiked || false,
		likesNum: props.likes as number
	});

	useEffect(() => {
		if (!videoRef.current) return;
		const vid = videoRef.current;

		function toggleSpinnerOn() {
			setShowSpinner(true);
		}
		function toggleSpinnerOff() {
			setShowSpinner(false);
		}
		function handlePlay() {
			setIsPlaying(true);
			albumRef.current!.style.animationPlayState = "running";
			musicRef.current!.style.animationPlayState = "running";
		}
		function handlePause() {
			setIsPlaying(false);
			albumRef.current!.style.animationPlayState = "paused";
			musicRef.current!.style.animationPlayState = "paused";
		}
		function handleClick() {
			if (cancelClickRef.current) return;
			if (vid.paused) vid.play();
			else vid.pause();
		}
		function disableContextMenu(e: Event) {
			e.preventDefault();
		}

		vid.addEventListener("loadeddata", toggleSpinnerOff);
		vid.addEventListener("waiting", toggleSpinnerOn);
		vid.addEventListener("playing", toggleSpinnerOff);
		vid.addEventListener("play", handlePlay);
		vid.addEventListener("pause", handlePause);
		vid.addEventListener("click", handleClick);
		vid.addEventListener("contextmenu", disableContextMenu);

		return () => {
			vid.removeEventListener("loadeddata", toggleSpinnerOff);
			vid.removeEventListener("waiting", toggleSpinnerOn);
			vid.removeEventListener("playing", toggleSpinnerOff);
			vid.removeEventListener("play", handlePlay);
			vid.removeEventListener("pause", handlePause);
			vid.removeEventListener("click", handleClick);
			vid.removeEventListener("contextmenu", disableContextMenu);
		};
	}, []);

	useEffect(() => {
		if (!videoRef.current || !infoDivRef.current) return;
		const vid = videoRef.current;
		const infoDiv = infoDivRef.current;
		let hideTimeout: NodeJS.Timeout;

		function handleTouchStart() {
			hideTimeout = setTimeout(() => {
				cancelClickRef.current = true;
				infoDiv.classList.remove("fade-in");
				infoDiv.classList.add("fade-out");
			}, 300);
		}
		function handleTouchEnd() {
			clearTimeout(hideTimeout);
			if (infoDiv.classList.contains("fade-out")) {
				infoDiv.classList.remove("fade-out");
				infoDiv.classList.add("fade-in");
			} else cancelClickRef.current = false;
		}

		vid.addEventListener("touchstart", handleTouchStart);
		vid.addEventListener("touchend", handleTouchEnd);

		return () => {
			vid.removeEventListener("touchstart", handleTouchStart);
			vid.removeEventListener("touchend", handleTouchEnd);
		};
	}, []);

	const handleLike = useCallback(() => {
		errorNotification(
			async () => {
				if (!isAuthed) throw new Error("Log in to continue");
				const res = await likeVideo(username!, props.videoId!);
				setLikesInfo(prev => ({
					hasLiked: res.data.liked,
					likesNum: prev.likesNum + (res.data.liked ? 1 : -1)
				}));
			},
			dispatch,
			null,
			"Couldn't like video:"
		);
	}, [isAuthed, dispatch, username, props.videoId]);

	const handleShare = useCallback(() => {
		errorNotification(
			async () => {
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
			},
			dispatch,
			null,
			"Couldn't copy video link:"
		);
	}, [dispatch, props.videoId]);

	return (
		<div className="video-component-container">
			<div className="video-container">
				<video
					ref={videoRef}
					src={constants.videoLink + "/" + props.videoId}
					playsInline
					loop
					preload="metadata"
				>
					Your browser does not support videos.
				</video>
				{showSpinner && (
					<div className="spinner-cont">
						<LoadingSpinner className="spinner" />
					</div>
				)}
			</div>
			<div className="video-content" ref={infoDivRef}>
				{!showSpinner && !isPlaying && <i className="fas fa-play play-btn" />}
				<aside>
					<div className="rounded-photo">
						<img
							src={constants.pfpLink + "/" + props.uploader!.username}
							alt={props.uploader!.name}
						/>
					</div>
					<div className="action-btns">
						<div>
							<i
								className={joinClasses(
									"fas fa-heart",
									likesInfo.hasLiked && "liked"
								)}
								onClick={handleLike}
							/>
							<span>{likesInfo.likesNum}</span>
						</div>
						<div>
							<i
								className="fas fa-comment-dots"
								onClick={() => setShowComments(true)}
							/>
							<span>{props.comments}</span>
						</div>
						<div>
							<i className="fas fa-share" onClick={handleShare} />
							<span>{props.shares}</span>
						</div>
					</div>
				</aside>
				<div className="video-info-wrapper">
					<div className="video-info">
						<div className="info-container">
							<a
								href={"/user/" + props.uploader!.username}
								className="username"
							>
								@{props.uploader!.username}
							</a>
							<p className="break-word">{props.caption}</p>
							<p className="views">
								<i className="fas fa-eye" />
								<span>{props.views}</span>
							</p>
							<div className="music-container">
								<span>
									<i className="fas fa-music" />
								</span>
								<div className="music">
									<p ref={musicRef}>
										<span>{props.music}</span>
										<span>{props.music}</span>
										<span>{props.music}</span>
									</p>
								</div>
							</div>
						</div>
						<div className="rounded-photo album-icon" ref={albumRef}>
							<img
								src={constants.pfpLink + "/" + props.uploader!.username}
								alt={props.uploader!.name}
							/>
						</div>
					</div>
				</div>
			</div>
			{showComments && (
				<CommentsModal
					uploader={props.uploader!.username!}
					videoId={props.videoId!}
					setShowComments={setShowComments}
					totalComments={props.comments as number}
				/>
			)}
		</div>
	);
}
