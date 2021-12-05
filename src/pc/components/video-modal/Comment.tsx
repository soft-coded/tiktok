import constants from "../../../common/constants";
import { CommentData } from "../../../common/types";
import { convertToDate } from "../../../common/utils";

export default function Comment(props: CommentData) {
	return (
		<div className="comment">
			<div className="rounded-photo">
				<img
					src={constants.pfpLink + "/" + props.postedBy!.username}
					alt={props.postedBy!.username}
				/>
			</div>
			<div className="comment-content">
				<h4>{props.postedBy!.name}</h4>
				<p>{props.comment}</p>
				<h5>{convertToDate(props.createdAt!)}</h5>
			</div>
			<div className="likes-portion">
				<i className="far fa-heart" />
				<span>{props.likes}</span>
			</div>
		</div>
	);
}
