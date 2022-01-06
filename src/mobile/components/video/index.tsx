import { useState, useEffect, useRef } from "react";

import "./video.scss";
import LoadingSpinner from "../../../common/components/loading-spinner";
import { VideoData } from "../../../common/types";
import constants from "../../../common/constants";

export default function Video(props: VideoData) {
	const cancelClickRef = useRef(false);
	const videoRef = useRef<HTMLVideoElement>(null);
	const infoDivRef = useRef<HTMLDivElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [showSpinner, setShowSpinner] = useState(true);

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
			if (cancelClickRef.current) return;
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
		if (!videoRef.current || !infoDivRef.current) return;
		const vid = videoRef.current;
		const infoDiv = infoDivRef.current;
		let hideTimeout: NodeJS.Timeout;

		function handleMouseDown() {
			hideTimeout = setTimeout(() => {
				cancelClickRef.current = true;
				infoDiv.classList.remove("fade-in");
				infoDiv.classList.add("fade-out");
			}, 300);
		}
		function handleMouseUp() {
			clearTimeout(hideTimeout);
			if (infoDiv.classList.contains("fade-out")) {
				infoDiv.classList.remove("fade-out");
				infoDiv.classList.add("fade-in");
			} else cancelClickRef.current = false;
		}

		vid.addEventListener("mousedown", handleMouseDown);
		vid.addEventListener("mouseup", handleMouseUp);

		return () => {
			vid.removeEventListener("mousedown", handleMouseDown);
			vid.removeEventListener("mouseup", handleMouseUp);
		};
	}, []);

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
		</div>
	);
}
