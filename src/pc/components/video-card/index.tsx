import { useState, MouseEvent } from "react";
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

export default function VideoCard({
	userId,
	profilePhoto,
	username,
	name,
	caption,
	music,
	video,
	likesNum,
	commentsNum,
	sharesNum,
	uploadTime
}: CardProps) {
	const [showModal, setShowModal] = useState(false);

	function handleModalOpen(e: MouseEvent) {
		e.preventDefault();
		setShowModal(true);
	}

	return (
		<div className="app-video-card">
			{showModal && (
				<VideoModal
					setShowModal={setShowModal}
					{...{
						userId,
						profilePhoto,
						name,
						username,
						caption,
						music,
						video,
						likesNum,
						sharesNum,
						commentsNum,
						uploadTime
					}}
				/>
			)}
			<Link to={"/user/" + userId} className="profile-pic">
				<div className="image-container">
					<img src={profilePhoto} alt={name} />
				</div>
			</Link>
			<div className="card-content">
				<header>
					<h4>{username}</h4>
					<h5>
						{name} | <span>{uploadTime}</span>
					</h5>
				</header>
				<p className="caption">{caption}</p>
				<p className="music">
					<i className="fas fa-music" /> {music}
				</p>
				<div className="card-video">
					<div className="video-container">
						<video
							src={video}
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
							number={likesNum}
						/>
						<ActionButton
							icon={<i className="fas fa-comment-dots" />}
							number={commentsNum}
						/>
						<ActionButton
							icon={<i className="fas fa-share" />}
							number={sharesNum}
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
