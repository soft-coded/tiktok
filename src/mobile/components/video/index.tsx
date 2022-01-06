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
				<div className="video-info-wrapper">
					<div className="video-info">
						<div className="info-container">
							<a
								href={"/user/" + props.uploader!.username}
								className="username"
							>
								@{props.uploader!.username}
							</a>
							<p className="break-word">{props.caption}</p>
							<div className="music-container">
								<span>
									<i className="fas fa-music" />
								</span>
								<div className="music">
									<p>
										<span>{props.music}</span>
										<span>{props.music}</span>
										<span>{props.music}</span>
									</p>
								</div>
							</div>
						</div>
						<div className="rounded-photo album-icon">
							<img
								src={constants.pfpLink + "/" + props.uploader!.username}
								alt={props.uploader!.name}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
