import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ReplyForm from "./ReplyForm";
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
	const [showReplyInput, setShowReplyInput] = useState(false);
	const [likeStats, setLikeStats] = useState({
		likesNum: props.likes!,
		hasLiked: props.hasLiked!
	});

	function showProfile() {
		props.url.prevURL = "/user/" + props.postedBy!.username;
		navigate("/user/" + props.postedBy!.username);
		props.handleModalClose();
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
				<div className="time-wrapper">
					<h5>{convertToDate(props.createdAt!)}</h5>
					<span
						className="clickable"
						onClick={() => setShowReplyInput(!showReplyInput)}
					>
						{showReplyInput ? (
							"Hide"
						) : (
							<>
								<i className="fas fa-reply" /> Reply
							</>
						)}
					</span>
				</div>
				{showReplyInput && (
					<ReplyForm commentId={props.commentId!} videoId={props.videoId} />
				)}
				{(props.replies as number) > 0 && (
					<p className="trigger-replies">
						View replies ({props.replies}) <i className="fas fa-caret-down" />
					</p>
				)}
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
