import "./comments-modal.scss";
import Input from "../input";

export default function AddComment() {
	return (
		<form className="add-comment-container">
			<Input placeholder="Add a comment" />
			<button type="submit" className="primary-button" disabled>
				<i className="fas fa-arrow-up" />
			</button>
		</form>
	);
}
