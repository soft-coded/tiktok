import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./video.scss";
import Container from "../../components/container";
import Sidebar from "../../components/sidebar";
import VideoCard from "../../components/video-card";
import { VideoData } from "../../../common/types";
import { getVideo } from "../../../common/api/video";
import { useAppDispatch } from "../../../common/store";
import { notificationActions } from "../../store/slices/notification-slice";
import LoadingSpinner from "../../components/loading-spinner";
import { joinClasses } from "../../../common/utils";

// tempId = 61ab9a45873a1874c8b32ed9;

export default function Video() {
	const [isLoading, setIsLoading] = useState(true);
	const [videoData, setVideoData] = useState<VideoData | null>(null);
	const videoId = useParams().videoId;
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchVideo() {
			try {
				if (!videoId) throw new Error("Invalid URL.");
				const res = await getVideo(videoId);
				setVideoData(res.data);
				setIsLoading(false);
			} catch (err: any) {
				dispatch(
					notificationActions.showNotification({
						type: "error",
						message: err.message
					})
				);
				// no need to set loading to false as the component gets unmounted anyway
				navigate("/", { replace: true });
			}
		}
		fetchVideo();
	}, [videoId, dispatch, navigate]);

	return (
		<Container className="video-page-container">
			<Sidebar />
			<div
				className={joinClasses("content-container", isLoading ? "loading" : "")}
			>
				{isLoading ? <LoadingSpinner /> : <VideoCard {...videoData} />}
			</div>
		</Container>
	);
}
