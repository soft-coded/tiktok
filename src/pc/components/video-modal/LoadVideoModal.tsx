import { useState, useEffect, useCallback } from "react";
import copy from "copy-to-clipboard";

import "./video-modal.scss";
import Modal from ".";
import FullscreenSpinner from "../../../common/components/fullscreen-spinner";
import useVideoDynamics, {
	videoDynamicsActions
} from "../video-card/useVideoDynamics";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { VideoData } from "../../../common/types";
import { getVideo, share } from "../../../common/api/video";
import { notificationActions } from "../../../common/store/slices/notification-slice";

export interface ModalProps {
	videoId: string;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoadVideoModal({ videoId, setShowModal }: ModalProps) {
	const dispatch = useAppDispatch();
	const username = useAppSelector(state => state.auth.username);
	const [videoData, setVideoData] = useState<VideoData | null>(null);
	const [vidDynamics, vidDispatch] = useVideoDynamics({
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
		vidDispatch({
			type: videoDynamicsActions.ALL,
			payload: {
				hasLiked: videoData.hasLiked!,
				likesNum: videoData.likes!,
				isFollowing: videoData.isFollowing,
				commentsNum: videoData.comments as number
			}
		});
	}, [videoData, vidDispatch]);

	const handleLike = useCallback(
		(hasLiked: boolean) => {
			vidDispatch({
				type: videoDynamicsActions.LIKED,
				hasLiked
			});
		},
		[vidDispatch]
	);

	const handleFollow = useCallback(
		(isFollowing: boolean) => {
			vidDispatch({ type: videoDynamicsActions.FOLLOWED, isFollowing });
		},
		[vidDispatch]
	);

	const handleCommentsChange = useCallback(
		(commentsNum: number) => {
			vidDispatch({ type: videoDynamicsActions.COMMENTED, commentsNum });
		},
		[vidDispatch]
	);

	const handleShare = useCallback(async () => {
		try {
			copy(window.location.origin + "/video/" + videoId);
			dispatch(
				notificationActions.showNotification({
					type: "success",
					message: "Video link copied to clipboard"
				})
			);
			await share(videoId);
		} catch (err: any) {
			dispatch(
				notificationActions.showNotification({
					type: "error",
					message: err.message
				})
			);
		}
	}, [dispatch, videoId]);

	return videoData ? (
		<Modal
			{...videoData}
			setShowModal={setShowModal}
			vidDynamics={vidDynamics}
			handleLike={handleLike}
			handleFollow={handleFollow}
			handleCommentsChange={handleCommentsChange}
			handleShare={handleShare}
		/>
	) : (
		<FullscreenSpinner />
	);
}
