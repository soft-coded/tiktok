import { useState } from "react";
import { Link } from "react-router-dom";

import "./video-card.scss";
import ActionButton from "../action-button";
import { useAppDispatch } from "../../../common/store";
import { modifyScrollbar } from "../../../common/utils";
import { VideoData } from "../../../common/types";
import { videoModalActions } from "../../store/slices/video-modal-slice";
import CardDropdown from "./CardDropdown";
import { DDAnimationTime } from "../dropdown";
import constants from "../../../common/constants";

const DDTimeThreshold = 600; // time after which dropdown gets unmounted
let DDMountTimeout: NodeJS.Timeout,
	DDHideTimeout: NodeJS.Timeout,
	DDUnmountTimeout: NodeJS.Timeout;

// export default function VideoCard(props: CardProps) {
export default function VideoCard(props: VideoData) {
	const [showProfileDD, setShowProfileDD] = useState(false);
	const dispatch = useAppDispatch();

	function handleModalOpen() {
		modifyScrollbar("hide");
		dispatch(videoModalActions.showModal(props));
	}

	function handleMouseOver() {
		DDMountTimeout = setTimeout(() => setShowProfileDD(true), DDTimeThreshold);
	}

	function handleMouseOut() {
		clearTimeout(DDMountTimeout);
		const card = document.querySelector(".video-card-dropdown");
		if (card) {
			// hide timeout
			DDHideTimeout = setTimeout(
				() => card.classList.add("hide"),
				DDTimeThreshold
			);
			// remove timeout
			DDUnmountTimeout = setTimeout(
				() => setShowProfileDD(false),
				DDAnimationTime + DDTimeThreshold
			);
		}
	}

	function handleDDMouseOver() {
		clearTimeout(DDHideTimeout);
		clearTimeout(DDUnmountTimeout);
	}

	return (
		<div className="app-video-card">
			<div className="profile-pic">
				<Link to={"/user/" + props.uploader!.username}>
					<div
						className="rounded-photo"
						onMouseOver={handleMouseOver}
						onMouseOut={handleMouseOut}
					>
						<img
							src={constants.pfpLink + "/" + props.uploader!.username}
							alt={props.uploader!.name}
						/>
					</div>
				</Link>
				{showProfileDD && (
					<CardDropdown
						{...props}
						onMouseOver={handleDDMouseOver}
						onMouseOut={handleMouseOut}
					/>
				)}
			</div>
			<div className="card-content">
				<header>
					<Link to={"/user/" + props.uploader!.username} className="username">
						<h4 onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
							{props.uploader!.username}
						</h4>
					</Link>
					<h5>
						{props.uploader!.name} |
						<span> {new Date(props.createdAt!).toLocaleDateString()}</span>
					</h5>
				</header>
				<p className="caption">{props.caption}</p>
				<p className="music">
					<i className="fas fa-music" /> {props.music}
				</p>
				<div className="card-video">
					<div className="video-container">
						<video
							src={constants.videoLink + "/" + props.videoId}
							playsInline
							muted
							autoPlay
							onClick={handleModalOpen}
						>
							Your browser does not support videos.
						</video>
					</div>
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
						<ActionButton
							icon={<i className="fas fa-share" />}
							number={props.shares as number}
							className="action-btn-container"
						/>
					</div>
				</div>
			</div>
			<div className="follow-btn">
				<button>Follow</button>
			</div>
		</div>
	);
}
