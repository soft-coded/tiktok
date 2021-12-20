import { useState, useRef, useEffect, useCallback, MouseEvent } from "react";

import classes from "./video-tag.module.scss";
import LoadingSpinner from "../loading-spinner";
import { ComponentProps } from "../../../common/types";
import { joinClasses, getTimeFromSeconds } from "../../../common/utils";

interface Props extends ComponentProps {
	src: string;
	autoPlay?: boolean;
	muted?: boolean;
	loop?: boolean;
	controls?: boolean;
	onClick?: (a?: any) => void;
}

export default function VideoTag({
	src,
	autoPlay,
	className,
	muted,
	loop,
	controls,
	onClick
}: Props) {
	const containerRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const wasPlaying = useRef(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [showSpinner, setShowSpinner] = useState(true);
	const [showControls, setShowControls] = useState(false);
	const [curTime, setCurTime] = useState(0);

	useEffect(() => {
		if (!videoRef.current || !containerRef.current) return;
		const vid = videoRef.current;
		const container = containerRef.current;

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
		function toggleControlsOff() {
			setShowControls(false);
		}
		function toggleControlsOn() {
			setShowControls(true);
		}
		function updateTime() {
			setCurTime(vid.currentTime);
		}

		vid.addEventListener("loadeddata", toggleSpinnerOff);
		vid.addEventListener("waiting", toggleSpinnerOn);
		vid.addEventListener("playing", toggleSpinnerOff);
		vid.addEventListener("play", toggleIsPlayingOn);
		vid.addEventListener("pause", toggleIsPlayingOff);
		vid.addEventListener("timeupdate", updateTime);
		container.addEventListener("mouseenter", toggleControlsOn);
		container.addEventListener("mouseleave", toggleControlsOff);

		return () => {
			vid.removeEventListener("loadeddata", toggleSpinnerOff);
			vid.removeEventListener("waiting", toggleSpinnerOn);
			vid.removeEventListener("playing", toggleSpinnerOff);
			vid.removeEventListener("play", toggleIsPlayingOn);
			vid.removeEventListener("pause", toggleIsPlayingOff);
			vid.removeEventListener("timeupdate", updateTime);
			container.removeEventListener("mouseenter", toggleControlsOn);
			container.removeEventListener("mouseleave", toggleControlsOff);
		};
	}, []);

	const handlePlayPause = useCallback((e: MouseEvent) => {
		if (!videoRef.current) return;
		if (videoRef.current.paused) videoRef.current.play();
		else videoRef.current.pause();

		e.stopPropagation();
		e.preventDefault();
	}, []);

	const changeTime = useCallback((duration: number) => {
		if (!videoRef.current) return;
		videoRef.current.currentTime = duration;
		setCurTime(duration);
	}, []);

	const handleSeek = useCallback(
		(e: MouseEvent) => {
			if (!videoRef.current) return;
			if (e.type === "mousedown") {
				wasPlaying.current = isPlaying;
				videoRef.current.pause();
			} else {
				if (wasPlaying.current) videoRef.current.play();
			}
		},
		[isPlaying]
	);

	return (
		<div
			className={joinClasses(classes["video-tag-container"], className)}
			ref={containerRef}
		>
			<video
				ref={videoRef}
				src={src}
				playsInline
				disablePictureInPicture
				autoPlay={autoPlay}
				muted={muted}
				loop={loop}
				onClick={onClick}
			>
				Your browser does not support HTML videos.
			</video>
			{showSpinner && <LoadingSpinner className={classes["spinner"]} />}
			{controls && !showSpinner && showControls && (
				<div className={classes["controls"]}>
					<i
						className={joinClasses(
							"fas",
							isPlaying ? "fa-pause" : "fa-play",
							classes["button"],
							classes["center-btn"]
						)}
						onClick={handlePlayPause}
					/>
					<div className={joinClasses(classes["button"], classes["seek-bar"])}>
						<input
							type="range"
							step={0.05}
							max={videoRef.current?.duration}
							min={0}
							value={curTime}
							onChange={e => changeTime(parseFloat(e.target.value))}
							onMouseDown={handleSeek}
							onMouseUp={handleSeek}
						/>
						<span>
							{getTimeFromSeconds(curTime)}&nbsp;/&nbsp;
							{videoRef.current
								? getTimeFromSeconds(videoRef.current.duration)
								: "00:00"}
						</span>
					</div>
				</div>
			)}
		</div>
	);
}
