import "./comments-modal.scss";
import { CommentData } from "../../../common/types";
import constants from "../../../common/constants";
import { convertToDate, joinClasses } from "../../../common/utils";

export default function Comment(props: CommentData) {
	return (
		<div className="comment-box">
			<div className="rounded-photo">
				<img
					src={constants.pfpLink + "/" + props.postedBy!.username}
					alt={props.postedBy!.name}
				/>
			</div>
			<div className="comment-content">
				<div className="comment-info">
					<h4>{props.postedBy!.name}</h4>
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
		</div>
	);
}
