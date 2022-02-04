import { MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import classes from "./notification-box.module.scss";
import { UserNotification } from "../../../common/types";
import constants from "../../../common/constants";
import { convertToDate, joinClasses } from "../../../common/utils";
import { errorNotification } from "../../helpers/error-notification";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { deleteNotif } from "../../../common/api/user";
import { notificationActions } from "../../../common/store/slices/notification-slice";

interface Props extends UserNotification {
	setNotifs: React.Dispatch<React.SetStateAction<UserNotification[] | null>>;
	fetchNotifs: () => void;
}

export default function NotificationBox(props: Props) {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { username, token } = useAppSelector(state => state.auth);

	function handleRedirect() {
		navigate(
			props.meta
				? "/video/" + props.meta.videoId
				: props.type === "likedVideo"
				? "/video/" + props.refId
				: "/user/" + props.by.username
		);
	}

	function handleDelete(e: MouseEvent) {
		e.stopPropagation();
		errorNotification(
			async () => {
				await deleteNotif(username!, token!, props._id!);
				dispatch(
					notificationActions.showNotification({
						type: "success",
						message: "Notification deleted"
					})
				);
				props.setNotifs(null);
				props.fetchNotifs();
			},
			dispatch,
			null,
			"Couldn't delete notification:"
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
			<div className={classes["box-end"]}>
				{(props.meta || props.type === "likedVideo") && (
					<div className={classes["video-container"]}>
						<video
							src={
								constants.videoLink +
								"/" +
								(props.type === "likedVideo" ? props.refId : props.meta.videoId)
							}
							// autoPlay
							// muted
							// loop
							// playsInline
						/>
					</div>
				)}
				<i className="fas fa-close" onClick={handleDelete} />
			</div>
		</div>
	);
}
