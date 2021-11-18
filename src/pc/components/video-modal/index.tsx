import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./video-modal.scss";
import { PostData as CardProps, modifyScrollbar } from "../../../common/utils";
import ActionButton from "../action-button";
import { videoModalActions } from "../../store/slices/video-modal-slice";

export interface ModalProps extends CardProps {
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function VideoModal(props: ModalProps) {
	const dispatch = useDispatch();

	function handleModalClose() {
		modifyScrollbar("show");
		dispatch(videoModalActions.hideModal());
	}

	return (
		<div className="app-video-modal">
			<div className="video-container-wrapper">
				<button className="close-btn" onClick={handleModalClose}>
					<i className="fas fa-times" />
				</button>
				<div className="poster-container" />
				<div className="video-container">
					<video src={props.video} playsInline autoPlay controls>
						Your browser does not support videos.
					</video>
				</div>
			</div>
			<div className="modal-content">
				<header>
					<div className="rounded-photo">
						<img src={props.profilePhoto} alt={props.name} />
					</div>
					<div className="names">
						<h3>{props.username}</h3>
						<h4>
							{props.name} | <span>{props.uploadTime}</span>
						</h4>
					</div>
					<div className="follow-btn">
						<button>Follow</button>
					</div>
				</header>
				<p className="caption">{props.caption}</p>
				<h5 className="music">
					<i className="fas fa-music" /> {props.music}
				</h5>
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
				</div>
				<div className="comments">
					<div className="unauthed">
						<h1>Log in to see comments</h1>
						<h5>Log in to see comments and like the video.</h5>
						<button>Log In</button>
						<p>
							Don't have an account? <Link to="/signup">Sign up</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
