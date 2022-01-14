import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./video.scss";
import Video from "../../components/video";
import { VideoData } from "../../../common/types";
import { errorNotification } from "../../helpers/error-notification";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { getVideo } from "../../../common/api/video";
import Swiper from "../../components/swiper";
import FullscreenSpinner from "../../../common/components/fullscreen-spinner";

export default function VideoPage() {
	const { videoId } = useParams();
	const dispatch = useAppDispatch();
	const username = useAppSelector(state => state.auth.username);
	const [vid, setVid] = useState<VideoData | null>(null);

	useEffect(() => {
		errorNotification(
			async () => {
				if (!videoId) throw new Error("Invalid URL");
				const res = await getVideo(videoId, username);
				delete res.data.success;
				setVid(res.data);
			},
			dispatch,
			null,
			"Couldn't load video:"
		);
	}, [dispatch, videoId, username]);

	return (
		<div className="video-page">
			{!vid ? <FullscreenSpinner /> : <Swiper slides={[<Video {...vid} />]} />}
		</div>
	);
}
