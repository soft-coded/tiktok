import { useState, Suspense, lazy } from "react";

import "./profile-card.scss";
import FullscreenSpinner from "../../components/fullscreen-spinner";
import { modifyScrollbar } from "../../../common/utils";
import constants from "../../../common/constants";
const VideoModal = lazy(() => import("../../components/video-modal"));

export default function ProfileCard({ videoId }: { videoId: string }) {
	const [showModal, setShowModal] = useState(false);

	function handleModalOpen() {
		modifyScrollbar("hide");
		setShowModal(true);
	}

	return (
		<div className="profile-card">
			{showModal && (
				<Suspense fallback={<FullscreenSpinner />}>
					<VideoModal videoId={videoId} setShowModal={setShowModal} />
				</Suspense>
			)}
			<div className="video-container">
				<video
					src={constants.videoLink + "/" + videoId}
					playsInline
					muted
					loop
					onMouseOver={e => (e.target as HTMLVideoElement).play()}
					onMouseOut={e => (e.target as HTMLVideoElement).pause()}
					onClick={handleModalOpen}
				>
					Your browser does not support videos.
				</video>
			</div>
		</div>
	);
}
