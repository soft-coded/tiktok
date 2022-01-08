import "./comments-modal.scss";
import { CommentData } from "../../../common/types";
import constants from "../../../common/constants";
import { convertToDate, joinClasses } from "../../../common/utils";

interface Props extends CommentData {
	uploader: string;
}

export default function Reply(props: Props) {
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
								props.hasLiked ? "fas" : "far",
								"fa-heart",
								props.hasLiked && "liked"
							)}
							// onClick={likeComm}
						/>
						<span>{props.likes}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
