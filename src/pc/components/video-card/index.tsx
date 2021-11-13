import { useState } from "react";
import { Link } from "react-router-dom";

import "./video-card.scss";
import ActionButton from "./ActionButton";
import VideoModal from "../video-modal";

export interface CardProps {
	userId: string;
	profilePhoto: string;
	username: string;
	name: string;
	caption: string;
	music: string;
	video: string;
	likesNum: string;
	commentsNum: string;
	sharesNum: string;
	uploadTime: string;
}

export default function VideoCard(props: CardProps) {
	const [showModal, setShowModal] = useState(false);

	function handleModalOpen() {
		document.documentElement.style.overflowY = "hidden";
		setShowModal(true);
	}

	return (
		<div className="app-video-card">
			{showModal && <VideoModal setShowModal={setShowModal} {...props} />}
			<Link to={"/user/" + props.userId} className="profile-pic">
				<div className="image-container">
					<img src={props.profilePhoto} alt={props.name} />
				</div>
			</Link>
			<div className="card-content">
				<header>
					<h4>{props.username}</h4>
					<h5>
						{props.name} | <span>{props.uploadTime}</span>
					</h5>
				</header>
				<p className="caption">{props.caption}</p>
				<p className="music">
					<i className="fas fa-music" /> {props.music}
				</p>
				<div className="card-video">
					<div className="video-container">
						<video
							src={props.video}
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
							number={props.likesNum}
						/>
						<ActionButton
							icon={<i className="fas fa-comment-dots" />}
							number={props.commentsNum}
						/>
						<ActionButton
							icon={<i className="fas fa-share" />}
							number={props.sharesNum}
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
