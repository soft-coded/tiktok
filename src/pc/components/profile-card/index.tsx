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
				<video src={video} playsInline onClick={() => handleModalOpen(index)}>
					Your browser does not support videos.
				</video>
			</div>
		</div>
	);
}
