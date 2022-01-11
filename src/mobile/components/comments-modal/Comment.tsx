import { useState, useCallback } from "react";

import "./comments-modal.scss";
import Reply from "./Reply";
import { CommentData } from "../../../common/types";
import constants from "../../../common/constants";
import { convertToDate, joinClasses } from "../../../common/utils";
import { errorNotification } from "../../helpers/error-notification";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import {
	deleteComment,
	getReplies,
	likeComment
} from "../../../common/api/video";
import LoadingSpinner from "../../../common/components/loading-spinner";
import { ReplyTo } from ".";
import Dropdown from "../../../common/components/dropdown";
import { notificationActions } from "../../../common/store/slices/notification-slice";

interface Props extends CommentData {
	uploader: string;
	videoId: string;
	setReplyTo: React.Dispatch<React.SetStateAction<ReplyTo | null>>;
	setComments: React.Dispatch<React.SetStateAction<CommentData[] | null>>;
	fetchComments: () => void;
}

export type LikesInfo = {
	likesNum: number;
	hasLiked: boolean;
};

export default function Comment(props: Props) {
	const dispatch = useAppDispatch();
	const { username, token } = useAppSelector(state => state.auth);
	const [showReplies, setShowReplies] = useState(false);
	const [likesInfo, setLikesInfo] = useState<LikesInfo>({
		hasLiked: props.hasLiked!,
		likesNum: props.likes!
	});
	const [replies, setReplies] = useState<CommentData[] | null>(null);
	const [repliesNum, setRepliesNum] = useState(props.replies as number);
	const [showOptions, setShowOptions] = useState(false);

	const fetchReplies = useCallback(() => {
		errorNotification(
			async () => {
				const res = await getReplies(props.videoId, props.commentId!, username);
				setReplies(res.data.replies);
			},
			dispatch,
			() => setReplies([]),
			"Couldn't load replies:"
		);
	}, [props.videoId, props.commentId, username, dispatch]);

	function toggleReplies() {
		if (showReplies) {
			setShowReplies(false);
			return;
		}
		if (!replies) fetchReplies();
		setShowReplies(true);
	}

	function likeComm() {
		errorNotification(
			async () => {
				const res = await likeComment(
					props.videoId,
					props.commentId!,
					username!
				);
				setLikesInfo(prev => ({
					hasLiked: res.data.liked,
					likesNum: prev.likesNum + (res.data.liked ? 1 : -1)
				}));
			},
			dispatch,
			null,
			"Couldn't like comment:"
		);
	}

	function delComm() {
		errorNotification(
			async () => {
				await deleteComment(props.commentId!, props.videoId, username!, token!);
				dispatch(
					notificationActions.showNotification({
						type: "success",
						message: "Comment deleted"
					})
				);
				props.setComments(null);
				props.fetchComments();
			},
			dispatch,
			null,
			"Couldn't delete comment:"
		);
	}

	return (
		<div className="comment-box">
			<div className="rounded-photo">
				<img
					src={constants.pfpLink + "/" + props.postedBy!.username}
					alt={props.postedBy!.name}
				/>
			</div>
			<div className="comment-content">
				<div className="info-wrapper">
					<div className="comment-info">
						<h4>
							{props.postedBy!.name}
							{props.uploader === props.postedBy!.username && (
								<span>• Creator</span>
							)}
						</h4>
						<p className="break-word">{props.comment}</p>
						<div className="time-reply">
							<span>{convertToDate(props.createdAt!)}</span>
							<span
								onClick={() =>
									props.setReplyTo({
										name: props.postedBy!.name!,
										commentId: props.commentId!,
										fetchReplies,
										setReplies,
										setShowReplies,
										setRepliesNum
									})
								}
							>
								<i className="fas fa-reply" /> Reply
							</span>
						</div>
					</div>
					<div className="buttons-container">
						{props.postedBy!.username === username && (
							<div className="options-container">
								<i
									className="fas fa-ellipsis-h"
									onClick={e => {
										setShowOptions(true);
										e.stopPropagation(); // required because of createPortal
									}}
								/>
								{showOptions && (
									<Dropdown
										className="dropdown"
										setShowDropdown={setShowOptions}
									>
										<span onClick={delComm}>
											<i className="fas fa-trash-alt" /> Delete
										</span>
									</Dropdown>
								)}
							</div>
						)}
						<div className="like-button">
							<i
								className={joinClasses(
									likesInfo.hasLiked ? "fas" : "far",
									"fa-heart",
									likesInfo.hasLiked && "liked"
								)}
								onClick={likeComm}
							/>
							<span>{likesInfo.likesNum}</span>
						</div>
					</div>
				</div>
				{showReplies &&
					(!replies ? (
						<LoadingSpinner className="spinner" />
					) : (
						<div className="replies-container">
							{replies.map((reply, i) => (
								<Reply
									key={i}
									{...reply}
									uploader={props.uploader}
									videoId={props.videoId}
									commentId={props.commentId!}
									setReplies={setReplies}
									fetchReplies={fetchReplies}
									setRepliesNum={setRepliesNum}
								/>
							))}
						</div>
					))}
				{repliesNum > 0 && (
					<p className="trigger-replies" onClick={toggleReplies}>
						{!showReplies ? (
							<>
								View replies ({repliesNum})&nbsp;
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
