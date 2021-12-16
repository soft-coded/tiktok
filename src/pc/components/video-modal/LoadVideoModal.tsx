import { useState, useEffect, useCallback } from "react";

import "./video-modal.scss";
import Modal from ".";
import FullscreenSpinner from "../fullscreen-spinner";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { VideoData } from "../../../common/types";
import { getVideo } from "../../../common/api/video";
import { notificationActions } from "../../store/slices/notification-slice";

export interface ModalProps {
	videoId: string;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

type VideoDynamics = {
	hasLiked: boolean;
	likesNum: number;
	commentsNum: number;
	isFollowing: boolean | undefined;
};

export default function LoadVideoModal({ videoId, setShowModal }: ModalProps) {
	const dispatch = useAppDispatch();
	const username = useAppSelector(state => state.auth.username);
	const [videoData, setVideoData] = useState<VideoData | null>(null);
	const [vidDynamics, setVidDynamics] = useState<VideoDynamics>({
		hasLiked: false,
		likesNum: 0,
		isFollowing: false,
		commentsNum: 0
	});

	useEffect(() => {
		async function fetchVid() {
			try {
				const res = await getVideo(videoId, username);
				setVideoData(res.data);
			} catch (err: any) {
				dispatch(
					notificationActions.showNotification({
						type: "error",
						message: err.message
					})
				);
			}
		}
		fetchVid();
	}, [dispatch, videoId, username]);

	useEffect(() => {
		if (!videoData) return;
		setVidDynamics({
			hasLiked: videoData.hasLiked!,
			likesNum: videoData.likes!,
			isFollowing: videoData.isFollowing,
			commentsNum: videoData.comments as number
		});
	}, [videoData]);

	const handleLike = useCallback((hasLiked: boolean) => {
		setVidDynamics(prev => ({
			...prev,
			hasLiked,
			likesNum: prev.likesNum + (hasLiked ? 1 : -1)
		}));
	}, []);

	return videoData ? (
		<Modal
			{...videoData}
			setShowModal={setShowModal}
			vidDynamics={vidDynamics}
			setVidDynamics={setVidDynamics}
			handleLike={handleLike}
		/>
	) : (
		<FullscreenSpinner />
	);
}
