import "./video.scss";
import { VideoData } from "../../../common/types";
import constants from "../../../common/constants";

export default function Video(props: VideoData) {
	return (
		<div className="video-component-container">
			<div className="video-container">
				<video src={constants.videoLink + "/" + props.videoId} playsInline loop>
					Your browser does not support videos.
				</video>
			</div>
			<div className="video-content">
				<aside>
					<div className="rounded-photo">
						<img
							src={constants.pfpLink + "/" + props.uploader!.username}
							alt={props.uploader!.name}
						/>
					</div>
					<div className="action-btns">
						<div className="likes">
							<i className="fas fa-heart" />
							<span>{props.likes}</span>
						</div>
						<div className="comments">
							<i className="fas fa-comment-dots" />
							<span>{props.comments}</span>
						</div>
						<div className="comments">
							<i className="fas fa-share" />
							<span>{props.shares}</span>
						</div>
					</div>
				</aside>
			</div>
		</div>
	);
}
