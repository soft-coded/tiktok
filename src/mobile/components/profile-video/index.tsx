import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./profile-video.module.scss";
import LoadingSpinner from "../../../common/components/loading-spinner";
import constants from "../../../common/constants";

interface Props {
	video: string;
}

export default function ProfileVideo({ video }: Props) {
	const navigate = useNavigate();
	const [showSpinner, setShowSpinner] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (!containerRef.current || !videoRef.current) return;
		const container = containerRef.current;
		const vid = videoRef.current;
		let playTimeout: NodeJS.Timeout,
			isPlaying = false,
			cancelClick = false;

		function handleClick() {
			if (cancelClick) return;
			navigate("/video/" + video);
		}
		function handleTouchStart() {
			playTimeout = setTimeout(() => {
				vid.play();
				isPlaying = true;
				cancelClick = true;
			}, 300);
		}
		function handleTouchEnd() {
			clearTimeout(playTimeout);
			if (isPlaying) {
				vid.pause();
				isPlaying = false;
			} else cancelClick = false;
		}
		function toggleSpinnerOn() {
			setShowSpinner(true);
		}
		function toggleSpinnerOff() {
			setShowSpinner(false);
		}
		function disableContextMenu(e: Event) {
			e.preventDefault();
		}

		container.addEventListener("click", handleClick);
		container.addEventListener("touchstart", handleTouchStart);
		container.addEventListener("touchend", handleTouchEnd);
		vid.addEventListener("waiting", toggleSpinnerOn);
		vid.addEventListener("playing", toggleSpinnerOff);
		vid.addEventListener("contextmenu", disableContextMenu);

		return () => {
			container.removeEventListener("click", handleClick);
			container.removeEventListener("touchstart", handleTouchStart);
			container.removeEventListener("touchend", handleTouchEnd);
			vid.removeEventListener("waiting", toggleSpinnerOn);
			vid.removeEventListener("playing", toggleSpinnerOff);
			vid.removeEventListener("contextmenu", disableContextMenu);
		};
	}, [navigate, video]);

	return (
		<div ref={containerRef} className={classes["video"]}>
			<video
				ref={videoRef}
				src={constants.videoLink + "/" + video + "#t=0.1"}
				preload="metadata"
				loop
				playsInline
				muted
			/>
			{showSpinner && <LoadingSpinner className={classes["spinner"]} />}
		</div>
	);
}
