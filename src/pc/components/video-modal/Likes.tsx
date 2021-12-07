import { useState } from "react";

import ActionButton from "../action-button";
import { useAppSelector, useAppDispatch } from "../../../common/store";
import { likeVideo } from "../../../common/api/video";
import { notificationActions } from "../../store/slices/notification-slice";
import { joinClasses } from "../../../common/utils";

interface Props {
	likes: number;
	handleAuthModalOpen: () => void;
	curVidId: string;
	hasLiked?: boolean;
}

export default function Likes(props: Props) {
	const [liked, setLiked] = useState(props.hasLiked ? props.hasLiked : false);
	const [likesNum, setLikesNum] = useState(props.likes);
	const { isAuthenticated: isAuthed, username } = useAppSelector(
		state => state.auth
	);
	const dispatch = useAppDispatch();

	async function likeVid() {
		if (!isAuthed) return props.handleAuthModalOpen();
		try {
			const res = await likeVideo(username!, props.curVidId);
			if (res.data.liked) {
				setLiked(true);
				setLikesNum(prev => prev + 1);
			} else {
				setLiked(false);
				setLikesNum(prev => prev - 1);
			}
		} catch (err: any) {
			dispatch(
				notificationActions.showNotification({
					type: "error",
					message: err.message
				})
			);
		}
	}

	return (
		<ActionButton
			icon={<i className="fas fa-heart" />}
			number={likesNum}
			className={joinClasses("action-btn-container", liked ? "liked" : "")}
			onClick={likeVid}
		/>
	);
}
