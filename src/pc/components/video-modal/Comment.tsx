import { CommentData } from "../../../common/types";

export default function Comment(props: CommentData) {
	return (
		<div className="comment">
			<div className="rounded-photo">
				<img src={props.postedBy?.profilePhoto} alt={props.postedBy?.name} />
			</div>
			<div className="comment-content">
				<h4>{props.postedBy?.name}</h4>
				<p>{props.comment}</p>
				<h5>{props.createdAt}</h5>
			</div>
		</div>
	);
}
