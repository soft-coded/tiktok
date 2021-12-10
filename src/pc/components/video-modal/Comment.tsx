import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import ReplyForm from "./ReplyForm";
import Reply from "./Reply";
import LoadingSpinner from "../loading-spinner";
import Dropdown from "../dropdown";
import constants from "../../../common/constants";
import { CommentData } from "../../../common/types";
import { convertToDate, joinClasses } from "../../../common/utils";
import {
	likeComment,
	getReplies,
	deleteComment
} from "../../../common/api/video";
import { useAppSelector, useAppDispatch } from "../../../common/store";
import { notificationActions } from "../../store/slices/notification-slice";

interface Props extends CommentData {
	handleModalClose: () => void;
	url: { prevURL: string };
	videoId: string;
	setComments: React.Dispatch<React.SetStateAction<CommentData[] | null>>;
	fetchComments: () => Promise<void>;
}

export default function Comment(props: Props) {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { username, token } = useAppSelector(state => state.auth);
	const poster = props.postedBy!.username;
	const isPoster = useMemo(() => username === poster, [poster, username]);
	const [showDropdown, setShowDropdown] = useState(false);
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

	async function deleteComm() {
		try {
			const res = await deleteComment(
				props.commentId!,
				props.videoId,
				username!,
				token!
			);
			dispatch(
				notificationActions.showNotification({
					type: "success",
					message: "Comment deleted"
				})
			);
			props.setComments(null);
			props.fetchComments();
		} catch (err: any) {
			dispatch(
				notificationActions.showNotification({
					type: "error",
					message: err.message
				})
			);
			setShowDropdown(false);
		}
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
				{isPoster && (
					<i
						className="fas fa-ellipsis-h"
						onClick={() => setShowDropdown(true)}
					/>
				)}
				{showDropdown && (
					<Dropdown
						className="comment-dropdown"
						setShowDropdown={setShowDropdown}
					>
						<span className="hoverable" onClick={() => deleteComm()}>
							<i className="fas fa-trash-alt" /> Delete
						</span>
					</Dropdown>
				)}
				<div className="likes-container">
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
		</div>
	);
}
