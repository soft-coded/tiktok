import ProfileCard from "../../components/profile-card";

interface Props {
	videos: string[];
}

export default function VideosLayout({ videos }: Props) {
	return videos.length === 0 ? (
		<h4>No videos.</h4>
	) : (
		<>
			{videos.map((video, i) => (
				<ProfileCard key={i} videoId={video} />
			))}
		</>
	);
}
