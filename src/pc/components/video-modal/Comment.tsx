import { useState } from "react";
import { useNavigate } from "react-router-dom";

import constants from "../../../common/constants";
import { CommentData } from "../../../common/types";
import { convertToDate, joinClasses } from "../../../common/utils";
import { likeComment } from "../../../common/api/video";
import { useAppSelector } from "../../../common/store";

interface Props extends CommentData {
	handleModalClose: () => void;
	url: { prevURL: string };
	videoId: string;
}

export default function Comment(props: Props) {
	const navigate = useNavigate();
	const username = useAppSelector(state => state.auth.username);
	const [likeStats, setLikeStats] = useState({
		likesNum: props.likes!,
		hasLiked: props.hasLiked!
	});

	function showProfile() {
		props.url.prevURL = "/user/" + props.postedBy!.username;
		props.handleModalClose();
		navigate("/user/" + props.postedBy!.username);
	}

	async function likeComm() {
		const res = await likeComment(props.videoId, props.commentId!, username!);
		if (res.data.liked)
			setLikeStats(prev => ({ likesNum: prev.likesNum + 1, hasLiked: true }));
		else
			setLikeStats(prev => ({ likesNum: prev.likesNum - 1, hasLiked: false }));
	}

	return (
		<div className="comment">
			<div className="rounded-photo clickable" onClick={showProfile}>
				<img
					src={constants.pfpLink + "/" + props.postedBy!.username}
					alt={props.postedBy!.username}
				/>
			</div>
			<div className="comment-content">
				<h4 className="clickable" onClick={showProfile}>
					{props.postedBy!.name}
				</h4>
				<p className="break-word">{props.comment}</p>
				<h5>{convertToDate(props.createdAt!)}</h5>
			</div>
			<div className="likes-portion">
				<i
					className={joinClasses(
						likeStats.hasLiked ? "fas" : "far",
						"fa-heart",
						likeStats.hasLiked ? "liked" : ""
					)}
					onClick={likeComm}
				/>
				<span>{likeStats.likesNum}</span>
			</div>
		</div>
	);
}
