import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./video.scss";
import PageWithSidebar from "../../components/page-with-sidebar";
import VideoCard from "../../components/video-card";
import { VideoData } from "../../../common/types";
import { getVideo } from "../../../common/api/video";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { notificationActions } from "../../store/slices/notification-slice";
import LoadingSpinner from "../../components/loading-spinner";

export default function Video() {
	const [videoData, setVideoData] = useState<VideoData | null>(null);
	const videoId = useParams().videoId;
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const username = useAppSelector(state => state.auth.username);

	useEffect(() => {
		async function fetchVideo() {
			try {
				if (!videoId) throw new Error("Invalid URL");
				const res = await getVideo(videoId, username);
				setVideoData(res.data);
			} catch (err: any) {
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
	}, [videoId, dispatch, navigate, username]);

	return (
		<PageWithSidebar className="video-page-container">
			<div className={"content-container"}>
				{!videoData ? <LoadingSpinner /> : <VideoCard {...videoData} />}
			</div>
		</PageWithSidebar>
	);
}
