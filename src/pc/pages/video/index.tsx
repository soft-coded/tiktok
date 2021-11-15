import "./video.scss";
import Container from "../../components/container";
import Sidebar from "../../components/sidebar";
import VideoCard from "../../components/video-card";
import { posts } from "../home";

export default function Video() {
	return (
		<Container className="video-page-container">
			<Sidebar />
			<div className="content-container">
				<VideoCard {...posts[0]} />
			</div>
		</Container>
	);
}
