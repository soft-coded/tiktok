import { Link, useNavigate } from "react-router-dom";

import classes from "./notification-box.module.scss";
import { UserNotification } from "../../../common/types";
import constants from "../../../common/constants";
import { convertToDate, joinClasses } from "../../../common/utils";

export default function NotificationBox(props: UserNotification) {
	const navigate = useNavigate();

	function handleRedirect() {
		navigate(
			props.meta
				? "/video/" + props.meta.videoId
				: props.type === "likedVideo"
				? "/video/" + props.refId
				: "/user/" + props.by.username
		);
	}

	return (
		<div
			className={joinClasses(
				classes["notif-box"],
				!props.read && classes["unread"]
			)}
			onClick={handleRedirect}
		>
			<Link
				to={"/user/" + props.by.username}
				className={joinClasses("rounded-photo", classes["pfp"])}
				onClick={e => e.stopPropagation()}
			>
				<img
					src={constants.pfpLink + "/" + props.by.username}
					alt={props.by.username}
				/>
			</Link>
			<div className={classes["content"]}>
				<Link
					to={"/user/" + props.by.username}
					className={classes["username"]}
					onClick={e => e.stopPropagation()}
				>
					{props.by.username}
				</Link>
				<p className="break-word">{props.message}</p>
				<span>{convertToDate(props.createdAt)}</span>
			</div>
			{(props.meta || props.type === "likedVideo") && (
				<div className={classes["video-container"]}>
					<video
						src={
							constants.videoLink +
							"/" +
							(props.type === "likedVideo" ? props.refId : props.meta.videoId)
						}
						autoPlay
						muted
						loop
						playsInline
					/>
				</div>
			)}
		</div>
	);
}
