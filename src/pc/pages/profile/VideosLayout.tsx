import ProfileCard from "../../components/profile-card";
import constants from "../../../common/constants";

interface Props {
	videos: string[];
	handleModalOpen: (a: number) => void;
}

export default function VideosLayout({ videos, handleModalOpen }: Props) {
	return videos.length === 0 ? (
		<h4>No videos.</h4>
	) : (
		<>
			{videos.map((video, i) => (
				<ProfileCard
					key={i}
					index={i}
					video={constants.videoLink + "/" + video}
					handleModalOpen={handleModalOpen}
				/>
			))}
		</>
	);
}
