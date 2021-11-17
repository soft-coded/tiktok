import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./video-card.scss";
import ActionButton from "../action-button";
import { PostData as CardProps, modifyScrollbar } from "../../../common/utils";
import { modalActions } from "../../store/slices/modal-slice";

export default function VideoCard(props: CardProps) {
	const dispatch = useDispatch();

	function handleModalOpen() {
		modifyScrollbar("hide");
		dispatch(modalActions.showModal(props));
	}

	return (
		<div className="app-video-card">
			<Link to={"/user/" + props.username} className="profile-pic">
				<div className="rounded-photo">
					<img src={props.profilePhoto} alt={props.name} />
				</div>
			</Link>
			<div className="card-content">
				<header>
					<Link to={"/user/" + props.username} className="username">
						<h4>{props.username}</h4>
					</Link>
					<h5>
						{props.name} | <span>{props.uploadTime}</span>
					</h5>
				</header>
				<p className="caption">{props.caption}</p>
				<p className="music">
					<i className="fas fa-music" /> {props.music}
				</p>
				<div className="card-video">
					<div className="video-container">
						<video
							src={props.video}
							playsInline
							muted
							autoPlay
							onClick={handleModalOpen}
						>
							Your browser does not support videos.
						</video>
					</div>
					<div className="action-buttons">
						<ActionButton
							icon={<i className="fas fa-heart" />}
							number={props.likesNum}
							className="action-btn-container"
						/>
						<ActionButton
							icon={<i className="fas fa-comment-dots" />}
							number={props.commentsNum}
							className="action-btn-container"
						/>
						<ActionButton
							icon={<i className="fas fa-share" />}
							number={props.sharesNum}
							className="action-btn-container"
						/>
					</div>
				</div>
			</div>
			<div className="follow-btn">
				<button>Follow</button>
			</div>
		</div>
	);
}
