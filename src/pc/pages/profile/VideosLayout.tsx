import ProfileCard from "../../components/profile-card";
import constants from "../../../common/constants";
import { VideoData } from "../../../common/types";

interface Props {
	videos: VideoData[];
}

export default function VideosLayout({ videos }: Props) {
	return videos.length === 0 ? (
		<h4>No videos.</h4>
	) : (
		<>
			{videos.map((video, i) => (
				<ProfileCard key={i} {...video} />
			))}
		</>
	);
}
