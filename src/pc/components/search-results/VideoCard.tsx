import { Link } from "react-router-dom";

import classes from "./search-results.module.scss";
import { VideoData } from "../../../common/types";
import { joinClasses } from "../../../common/utils";
import constants from "../../../common/constants";

export default function VideoCard(props: VideoData) {
	return (
		<Link
			to={"/video/" + props.videoId}
			className={joinClasses("clickable", classes["video-card"])}
		>
			<div className={classes["video-container"]}>
				<video
					src={constants.videoLink + "/" + props.videoId}
					loop
					muted
					onMouseOver={e => (e.target as HTMLVideoElement).play()}
					onMouseOut={e => (e.target as HTMLVideoElement).pause()}
				/>
			</div>
			<div className={classes["card-content"]}>
				<p className={classes["clamp-text"]}>
					{props.caption}&nbsp;
					{props.tags!.map((tag, i) => (
						<span key={i}>#{tag}&nbsp;</span>
					))}
				</p>
				<div className={classes["info"]}>
					<div className={classes["uploader"]}>
						<div className={joinClasses("rounded-photo", classes["pfp"])}>
							<img
								src={constants.pfpLink + "/" + props.uploader!.username}
								alt={props.uploader!.username}
							/>
						</div>
						<h5>{props.uploader!.username}</h5>
					</div>
					<div>
						<i className="fas fa-eye" /> {props.views}
					</div>
				</div>
			</div>
		</Link>
	);
}
