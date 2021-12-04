import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./video.scss";
import Container from "../../components/container";
import Sidebar from "../../components/sidebar";
import VideoCard from "../../components/video-card";
import { getVideo } from "../../../common/api/video";
import { useAppDispatch } from "../../../common/store";
import { notificationActions } from "../../store/slices/notification-slice";

export default function Video() {
	const [isLoading, setIsLoading] = useState(true);
	const [videoData, setVideoData] = useState(null);
	const videoId = useParams().id;
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchVideo() {
			try {
				const res = await getVideo(videoId!);
				setIsLoading(false);
				setVideoData(res.data);
			} catch (err: any) {
				setIsLoading(false);
				dispatch(
					notificationActions.showNotification({
						type: "error",
						message: err.message
					})
				);
				navigate("/", { replace: true });
			}
		}
		fetchVideo();
	}, [videoId]);

	return (
		<Container className="video-page-container">
			<Sidebar />
			<div className="content-container">
				{/* <VideoCard {...posts[0]} /> */}
			</div>
		</Container>
	);
}
