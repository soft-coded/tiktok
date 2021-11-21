import { CommentData } from "../../../common/types";

export default function Comment(props: CommentData) {
	return (
		<div className="comment">
			<div className="rounded-image">
				<img src={props.profilePhoto} alt={props.name} />
			</div>
			<div className="comment-content">
				<h4>{props.name}</h4>
				<p>{props.comment}</p>
				<h5>{props.postedTime}</h5>
			</div>
		</div>
	);
}
