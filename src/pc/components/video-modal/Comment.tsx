import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import ReplyForm from "./ReplyForm";
import Reply from "./Reply";
import LoadingSpinner from "../../../common/components/loading-spinner";
import Dropdown from "../dropdown";
import UserDropdown from "../user-dropdown";
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
	fetchCommentsNum: () => Promise<void>;
}

export default function Comment(props: Props) {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { username, token } = useAppSelector(state => state.auth);
	const poster = props.postedBy!.username;
	const isPoster = useMemo(() => username === poster, [poster, username]);
	const [showOptions, setShowOptions] = useState(false);
	const [showUserDD, setShowUserDD] = useState(false);
	const [totalReplies, setTotalReplies] = useState(props.replies as number);
	const [replies, setReplies] = useState<CommentData[] | null>(null);
	const [showReplies, setShowReplies] = useState(false);
	const [showReplyInput, setShowReplyInput] = useState(false);
	const [likeStats, setLikeStats] = useState({
		likesNum: props.likes!,
		hasLiked: props.hasLiked!
	});
	const { fetchCommentsNum } = props;

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
			const res = (await getReplies(props.videoId, props.commentId!, username!))
				.data.replies;
			fetchCommentsNum();
			return res;
		} catch (err: any) {
			dispatch(
				notificationActions.showNotification({
					type: "error",
					message: err.message
				})
			);
		}
	}, [props.videoId, props.commentId, dispatch, username, fetchCommentsNum]);

	async function triggerReplies() {
		if (showReplies) return setShowReplies(false);
		setShowReplies(true);
		if (!replies) setReplies(await fetchReplies());
	}

	async function deleteComm() {
		try {
			await deleteComment(props.commentId!, props.videoId, username!, token!);
			dispatch(
				notificationActions.showNotification({
					type: "success",
					message: "Comment deleted"
				})
			);
			props.setComments(null);
			props.fetchComments();
			fetchCommentsNum();
		} catch (err: any) {
			dispatch(
				notificationActions.showNotification({
					type: "error",
					message: err.message
				})
			);
			setShowOptions(false);
		}
	}

	function showUDD() {
		setShowUserDD(true);
	}

	function hideUDD() {
		setShowUserDD(false);
	}

	return (
		<div className="comment">
			<div className="dropdown-wrapper">
				<UserDropdown
					showDropdown={showUserDD}
					onMouseOver={showUDD}
					onMouseOut={hideUDD}
					username={props.postedBy!.username!}
				/>
			</div>
			<div
				className="rounded-photo clickable"
				onClick={showProfile}
				onMouseOver={showUDD}
				onMouseOut={hideUDD}
			>
				<img
					src={constants.pfpLink + "/" + props.postedBy!.username}
					alt={props.postedBy!.username}
				/>
			</div>
			<div className="comment-content">
				<div className="container-wrapper">
					<div className="content-wrapper">
						<h4
							className="clickable"
							onClick={showProfile}
							onMouseOver={showUDD}
							onMouseOut={hideUDD}
						>
							{props.postedBy!.name}
						</h4>
						<p className="break-word">{props.comment}</p>
					</div>
					<div className="likes-portion">
						{isPoster && (
							<i
								className="fas fa-ellipsis-h"
								onClick={() => setShowOptions(true)}
							/>
						)}
						{showOptions && (
							<Dropdown
								className="comment-dropdown"
								setShowDropdown={setShowOptions}
							>
								<span className="hoverable" onClick={deleteComm}>
									<i className="fas fa-trash-alt" /> Delete
								</span>
							</Dropdown>
						)}
						<div className="likes-container">
							<i
								className={joinClasses(
									likeStats.hasLiked ? "fas" : "far",
									"fa-heart",
									likeStats.hasLiked && "liked"
								)}
								onClick={likeComm}
							/>
							<span>{likeStats.likesNum}</span>
						</div>
					</div>
				</div>
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
								commentId={props.commentId}
								setTotalReplies={setTotalReplies}
								setReplies={setReplies}
								fetchReplies={fetchReplies}
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
		</div>
	);
}
