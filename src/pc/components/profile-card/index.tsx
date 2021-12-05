import "./profile-card.scss";

interface CardProps {
	video: string;
	index: number;
	handleModalOpen: (i: number) => void;
}

export default function ProfileCard({
	video,
	handleModalOpen,
	index
}: CardProps) {
	return (
		<div className="profile-card">
			<div className="video-container">
				<video
					src={video}
					playsInline
					muted
					onClick={() => handleModalOpen(index)}
					onMouseOver={e => (e.target as HTMLVideoElement).play()}
					onMouseOut={e => (e.target as HTMLVideoElement).pause()}
				>
					Your browser does not support videos.
				</video>
			</div>
		</div>
	);
}
