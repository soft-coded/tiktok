import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import classes from "./searched-video.module.scss";
import { VideoData } from "../../../common/types";
import constants from "../../../common/constants";
import { joinClasses } from "../../../common/utils";

export default function SearchedVideo(props: VideoData) {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (!videoRef.current) return;
		const vid = videoRef.current;
		let cancelClick: boolean, clickTimeout: NodeJS.Timeout, isPlaying: boolean;

		function handleClick(e: Event) {
			if (cancelClick) e.stopPropagation();
		}
		function handleTouchStart() {
			clickTimeout = setTimeout(() => {
				vid.play();
				isPlaying = true;
				cancelClick = true;
			}, 300);
		}
		function handleTouchEnd() {
			clearTimeout(clickTimeout);
			if (isPlaying) {
				vid.pause();
				isPlaying = false;
			} else cancelClick = false;
		}
		function noMenu(e: Event) {
			e.preventDefault();
		}

		vid.addEventListener("touchstart", handleTouchStart);
		vid.addEventListener("touchend", handleTouchEnd);
		vid.addEventListener("click", handleClick);
		vid.addEventListener("contextmenu", noMenu);

		return () => {
			vid.removeEventListener("touchstart", handleTouchStart);
			vid.removeEventListener("touchend", handleTouchEnd);
			vid.removeEventListener("click", handleClick);
			vid.removeEventListener("contextmenu", noMenu);
		};
	}, []);

	return (
		<Link to={"/video/" + props.videoId} className={classes["video"]}>
			<div className={classes["vid-container"]}>
				<video
					ref={videoRef}
					src={constants.videoLink + "/" + props.videoId}
					muted
					loop
				/>
			</div>
			<div className={classes["content"]}>
				<p className={classes["hide-overflow"]}>{props.caption}</p>
				<p className={classes["hide-overflow"]}>
					{props.tags!.map((tag, i) => (
						<span key={i}>#{tag} </span>
					))}
				</p>
				<div className={classes["bottom"]}>
					<div className={classes["uploader"]}>
						<div className={joinClasses("rounded-photo", classes["pfp"])}>
							<img
								src={constants.pfpLink + "/" + props.uploader!.username}
								alt={props.uploader!.name}
							/>
						</div>
						<span>{props.uploader!.username}</span>
					</div>
					<span>
						<i className="fas fa-eye" /> {props.views}
					</span>
				</div>
			</div>
		</Link>
	);
}
