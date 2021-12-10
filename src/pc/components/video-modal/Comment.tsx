import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import ReplyForm from "./ReplyForm";
import Reply from "./Reply";
import LoadingSpinner from "../loading-spinner";
import constants from "../../../common/constants";
import { CommentData } from "../../../common/types";
import { convertToDate, joinClasses } from "../../../common/utils";
import { likeComment, getReplies } from "../../../common/api/video";
import { useAppSelector, useAppDispatch } from "../../../common/store";
import { notificationActions } from "../../store/slices/notification-slice";

interface Props extends CommentData {
	handleModalClose: () => void;
	url: { prevURL: string };
	videoId: string;
}

export default function Comment(props: Props) {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const username = useAppSelector(state => state.auth.username);
	const [totalReplies, setTotalReplies] = useState(props.replies as number);
	const [replies, setReplies] = useState<CommentData[] | null>(null);
	const [showReplies, setShowReplies] = useState(false);
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

	const fetchReplies = useCallback(async () => {
		try {
			return (await getReplies(props.videoId, props.commentId!)).data.replies;
		} catch (err: any) {
			dispatch(
				notificationActions.showNotification({
					type: "error",
					message: err.message
				})
			);
		}
	}, [props.videoId, props.commentId, dispatch]);

	async function triggerReplies() {
		if (showReplies) return setShowReplies(false);
		setShowReplies(true);
		if (!replies) setReplies(await fetchReplies());
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
					<ReplyForm
						commentId={props.commentId!}
						videoId={props.videoId}
						setReplies={setReplies}
						setShowReplies={setShowReplies}
						hideReplyInput={() => setShowReplyInput(false)}
						fetchReplies={fetchReplies}
						setTotalReplies={setTotalReplies}
					/>
				)}
				{showReplies &&
					(replies ? (
						replies.map(reply => (
							<Reply
								key={reply.replyId}
								{...reply}
								handleModalClose={props.handleModalClose}
								url={props.url}
								videoId={props.videoId}
							/>
						))
					) : (
						<LoadingSpinner className="comments-spinner" />
					))}
				{totalReplies > 0 && (
					<p className="clickable trigger-replies" onClick={triggerReplies}>
						{!showReplies ? (
							<>
								View replies ({totalReplies})&nbsp;
								<i className="fas fa-caret-down" />
							</>
						) : (
							<>
								Hide replies <i className="fas fa-caret-up" />
							</>
						)}
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
