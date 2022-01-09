import { useState } from "react";

import "./comments-modal.scss";
import { CommentData } from "../../../common/types";
import constants from "../../../common/constants";
import { convertToDate, joinClasses } from "../../../common/utils";
import { likeReply } from "../../../common/api/video";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { errorNotification } from "../../helpers/error-notification";
import { LikesInfo } from "./Comment";

interface Props extends CommentData {
	uploader: string;
	commentId: string;
	videoId: string;
}

export default function Reply(props: Props) {
	const dispatch = useAppDispatch();
	const username = useAppSelector(state => state.auth.username!);
	const [likesInfo, setLikesInfo] = useState<LikesInfo>({
		hasLiked: props.hasLiked!,
		likesNum: props.likes!
	});

	function likeRep() {
		errorNotification(
			async () => {
				const res = await likeReply(
					props.videoId,
					props.commentId!,
					props.replyId!,
					username
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
					<div className="likes-container">
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
	);
}
