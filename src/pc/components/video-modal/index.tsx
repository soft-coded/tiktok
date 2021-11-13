import { Link } from "react-router-dom";

import "./video-modal.scss";
import { CardProps } from "../video-card";
import ActionButton from "../video-card/ActionButton";

interface ModalProps extends CardProps {
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function VideoModal({
	profilePhoto,
	name,
	username,
	caption,
	music,
	likesNum,
	commentsNum,
	video,
	uploadTime,
	setShowModal
}: ModalProps) {
	return (
		<div className="app-video-modal">
			<div className="video-container-wrapper">
				<button className="close-btn" onClick={() => setShowModal(false)}>
					<i className="fas fa-times" />
				</button>
				<div className="poster-container" />
				<div className="video-container">
					<video src={video} playsInline autoPlay controls>
						Your browser does not support videos.
					</video>
				</div>
			</div>
			<div className="modal-content">
				<header>
					<div className="image-container">
						<img src={profilePhoto} alt={name} />
					</div>
					<div className="names">
						<h3>{username}</h3>
						<h4>
							{name} | <span>{uploadTime}</span>
						</h4>
					</div>
					<div className="follow-btn">
						<button>Follow</button>
					</div>
				</header>
				<p className="caption">{caption}</p>
				<h5 className="music">
					<i className="fas fa-music" /> {music}
				</h5>
				<div className="action-buttons">
					<ActionButton
						icon={<i className="fas fa-heart" />}
						number={likesNum}
					/>
					<ActionButton
						icon={<i className="fas fa-comment-dots" />}
						number={commentsNum}
					/>
				</div>
				<div className="comments">
					<div className="unauthed">
						<h1>Log in to see comments</h1>
						<h5>Log in to see comments and like the video.</h5>
						<button>Log In</button>
						<p>
							Don't have an account? <Link to="/signup">Sign up</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
