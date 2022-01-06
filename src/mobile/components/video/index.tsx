import { useState, useEffect, useRef } from "react";

import "./video.scss";
import LoadingSpinner from "../../../common/components/loading-spinner";
import { VideoData } from "../../../common/types";
import constants from "../../../common/constants";

export default function Video(props: VideoData) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [showSpinner, setShowSpinner] = useState(true);
	const [showInfo, setShowInfo] = useState(true);

	useEffect(() => {
		if (!videoRef.current) return;
		const vid = videoRef.current;

		function toggleSpinnerOn() {
			setShowSpinner(true);
		}
		function toggleSpinnerOff() {
			setShowSpinner(false);
		}
		function toggleIsPlayingOn() {
			setIsPlaying(true);
		}
		function toggleIsPlayingOff() {
			setIsPlaying(false);
		}
		function handleClick() {
			if (vid.paused) vid.play();
			else vid.pause();
		}

		vid.addEventListener("loadeddata", toggleSpinnerOff);
		vid.addEventListener("waiting", toggleSpinnerOn);
		vid.addEventListener("playing", toggleSpinnerOff);
		vid.addEventListener("play", toggleIsPlayingOn);
		vid.addEventListener("pause", toggleIsPlayingOff);
		vid.addEventListener("click", handleClick);

		return () => {
			vid.removeEventListener("loadeddata", toggleSpinnerOff);
			vid.removeEventListener("waiting", toggleSpinnerOn);
			vid.removeEventListener("playing", toggleSpinnerOff);
			vid.removeEventListener("play", toggleIsPlayingOn);
			vid.removeEventListener("pause", toggleIsPlayingOff);
			vid.removeEventListener("click", handleClick);
		};
	}, []);

	useEffect(() => {
		if (!videoRef.current) return;
		const vid = videoRef.current;
		let hideTimeout: NodeJS.Timeout;

		function handleMouseDown() {
			hideTimeout = setTimeout(() => {
				setShowInfo(false);
				vid.pause();
			}, 300);
		}
		function handleMouseUp() {
			clearTimeout(hideTimeout);
			if (!showInfo) setShowInfo(true);
		}

		vid.addEventListener("mousedown", handleMouseDown);
		vid.addEventListener("mouseup", handleMouseUp);

		return () => {
			vid.removeEventListener("mousedown", handleMouseDown);
			vid.removeEventListener("mouseup", handleMouseUp);
		};
	}, [showInfo]);

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
				{!showSpinner && !isPlaying && <i className="fas fa-play play-btn" />}
			</div>
			{showInfo && (
				<div className="video-content">
					<aside>
						<div className="rounded-photo">
							<img
								src={constants.pfpLink + "/" + props.uploader!.username}
								alt={props.uploader!.name}
							/>
						</div>
						<div className="action-btns">
							<div className="likes">
								<i className="fas fa-heart" />
								<span>{props.likes}</span>
							</div>
							<div className="comments">
								<i className="fas fa-comment-dots" />
								<span>{props.comments}</span>
							</div>
							<div className="comments">
								<i className="fas fa-share" />
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
										<p>
											<span>{props.music}</span>
											<span>{props.music}</span>
											<span>{props.music}</span>
										</p>
									</div>
								</div>
							</div>
							<div className="rounded-photo album-icon">
								<img
									src={constants.pfpLink + "/" + props.uploader!.username}
									alt={props.uploader!.name}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
