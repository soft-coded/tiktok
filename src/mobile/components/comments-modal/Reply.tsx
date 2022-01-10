import { useState } from "react";

import "./comments-modal.scss";
import { CommentData } from "../../../common/types";
import constants from "../../../common/constants";
import { convertToDate, joinClasses } from "../../../common/utils";
import { deleteReply, likeReply } from "../../../common/api/video";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { errorNotification } from "../../helpers/error-notification";
import { LikesInfo } from "./Comment";
import { notificationActions } from "../../store/slices/notification-slice";
import Dropdown from "../../../common/components/dropdown";

interface Props extends CommentData {
	uploader: string;
	commentId: string;
	videoId: string;
	setReplies: React.Dispatch<React.SetStateAction<CommentData[] | null>>;
	fetchReplies: () => void;
	setRepliesNum: React.Dispatch<React.SetStateAction<number>>;
}

export default function Reply(props: Props) {
	const dispatch = useAppDispatch();
	const { username, token } = useAppSelector(state => state.auth);
	const [likesInfo, setLikesInfo] = useState<LikesInfo>({
		hasLiked: props.hasLiked!,
		likesNum: props.likes!
	});
	const [showOptions, setShowOptions] = useState(false);

	function likeRep() {
		errorNotification(
			async () => {
				const res = await likeReply(
					props.videoId,
					props.commentId!,
					props.replyId!,
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

	function delRep() {
		errorNotification(
			async () => {
				await deleteReply(
					props.videoId,
					props.commentId,
					props.replyId!,
					username!,
					token!
				);
				dispatch(
					notificationActions.showNotification({
						type: "success",
						message: "Reply deleted"
					})
				);
				props.setRepliesNum(prev => prev - 1);
				props.setReplies(null);
				props.fetchReplies();
			},
			dispatch,
			null,
			"Couldn't delete reply:"
		);
	}

	return (
		<div className="comment-box reply-box">
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
										<span onClick={delRep}>
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
								onClick={likeRep}
							/>
							<span>{likesInfo.likesNum}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
