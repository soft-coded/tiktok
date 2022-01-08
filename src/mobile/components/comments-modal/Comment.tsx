import { useState, useCallback } from "react";

import "./comments-modal.scss";
import Reply from "./Reply";
import { CommentData } from "../../../common/types";
import constants from "../../../common/constants";
import { convertToDate, joinClasses } from "../../../common/utils";
import { errorNotification } from "../../helpers/error-notification";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { getReplies } from "../../../common/api/video";
import LoadingSpinner from "../../../common/components/loading-spinner";

interface Props extends CommentData {
	uploader: string;
	videoId: string;
}

export default function Comment(props: Props) {
	const dispatch = useAppDispatch();
	const username = useAppSelector(state => state.auth.username!);
	const [showReplies, setShowReplies] = useState(false);
	const [replies, setReplies] = useState<CommentData[] | null>(null);

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
							<span>
								<i className="fas fa-reply" /> Reply
							</span>
						</div>
					</div>
					<div className="likes-container">
						<i
							className={joinClasses(
								props.hasLiked ? "fas" : "far",
								"fa-heart",
								props.hasLiked && "liked"
							)}
							// onClick={likeComm}
						/>
						<span>{props.likes}</span>
					</div>
				</div>
				{showReplies &&
					(!replies ? (
						<LoadingSpinner className="spinner" />
					) : (
						<div className="replies-container">
							{replies.map((reply, i) => (
								<Reply key={i} {...reply} uploader={props.uploader} />
							))}
						</div>
					))}
				{props.replies! > 0 && (
					<p className="trigger-replies" onClick={toggleReplies}>
						{!showReplies ? (
							<>
								View replies ({props.replies})&nbsp;
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
