import { Link } from "react-router-dom";

import "./video-card.scss";

export interface CardProps {
	userId: string;
	profilePhoto: string;
	username: string;
	name: string;
	caption: string;
	music: string;
	video: string;
}

export default function VideoCard({
	userId,
	profilePhoto,
	username,
	name,
	caption,
	music,
	video
}: CardProps) {
	return (
		<div className="app-video-card">
			<Link to={"/user/" + userId} className="profile-pic">
				<div className="image-container">
					<img src={profilePhoto} alt={name} />
				</div>
			</Link>
			<div className="card-content">
				<header>
					<h4>{username}</h4>
					<h5>{name}</h5>
				</header>
				<p className="caption">{caption}</p>
				<p className="music">
					<i className="fas fa-music" /> {music}
				</p>
				<div className="card-video">
					<div className="video-container">
						<video src={video} playsInline muted autoPlay loop controls>
							Your browser does not support videos.
						</video>
					</div>
				</div>
			</div>
		</div>
	);
}
