import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import classes from "./header.module.scss";
import Dropdown from "../../../common/components/dropdown";
import { UserNotification } from "../../../common/types";
import { useAppSelector, useAppDispatch } from "../../../common/store";
import { notificationActions } from "../../../common/store/slices/notification-slice";
import { deleteNotif, getCustom } from "../../../common/api/user";
import LoadingSpinner from "../../../common/components/loading-spinner";
import constants from "../../../common/constants";
import { convertToDate, joinClasses } from "../../../common/utils";

interface Props {
	setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserNotifications({ setShowDropdown }: Props) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [notifs, setNotifs] = useState<null | UserNotification[]>(null);
	const { username, token } = useAppSelector(state => state.auth);

	const fetchNotifs = useCallback(async () => {
		try {
			const res = await getCustom({ notifications: "1" }, username!);
			setNotifs(res.data.notifications);
		} catch (err: any) {
			dispatch(
				notificationActions.showNotification({
					type: "error",
					message: "Couldn't fetch notifications: " + err.message
				})
			);
		}
	}, [username, dispatch]);

	useEffect(() => {
		fetchNotifs();
	}, [fetchNotifs]);

	const delNotif = useCallback(
		async (notificationId: string) => {
			try {
				await deleteNotif(username!, token!, notificationId);
				setNotifs(null);
				fetchNotifs();
				dispatch(
					notificationActions.showNotification({
						type: "success",
						message: "Notification deleted"
					})
				);
			} catch (err: any) {
				dispatch(
					notificationActions.showNotification({
						type: "error",
						message: "Couldn't delete notification: " + err.message
					})
				);
			}
		},
		[dispatch, fetchNotifs, token, username]
	);

	function handleRedirect(notif: UserNotification) {
		navigate(
			notif.meta
				? "/video/" + notif.meta.videoId
				: notif.type === "likedVideo"
				? "/video/" + notif.refId
				: "/user/" + notif.by.username
		);

		setShowDropdown(false);
	}

	return (
		<Dropdown
			className={classes["inbox-card"]}
			setShowDropdown={setShowDropdown}
		>
			<h1>Notifications</h1>
			{!notifs ? (
				<LoadingSpinner className={classes["notif-spinner"]} />
			) : (
				notifs.map((notif, i) => (
					<div
						key={i}
						className={joinClasses(
							"hoverable",
							classes["notif-container"],
							!notif.read && classes["unread"]
						)}
						title={notif.message}
						onClick={() => handleRedirect(notif)}
					>
						<Link
							to={"/user/" + notif.by.username}
							onClick={e => e.stopPropagation()}
						>
							<div
								className={joinClasses(
									"rounded-photo",
									classes["rounded-photo"]
								)}
							>
								<img
									src={constants.pfpLink + "/" + notif.by.username}
									alt={notif.by.username}
								/>
							</div>
						</Link>
						<div className={classes["content"]}>
							<Link
								to={"/user/" + notif.by.username}
								onClick={e => e.stopPropagation()}
							>
								<h4>{notif.by.username}</h4>
							</Link>
							<p className="clamp-text">{notif.message}</p>
							<span>{convertToDate(notif.createdAt)}</span>
						</div>
						{(notif.meta || notif.type === "likedVideo") && (
							<div className={classes["video-container"]}>
								<video
									src={
										constants.videoLink +
										"/" +
										(notif.type === "likedVideo"
											? notif.refId
											: notif.meta!.videoId)
									}
									loop
									autoPlay
									muted
									playsInline
								/>
							</div>
						)}
						<div className={classes["delete-btn"]} title="Delete notification">
							<i
								className="fas fa-close"
								onClick={e => {
									e.stopPropagation();
									delNotif(notif._id!);
								}}
							/>
						</div>
					</div>
				))
			)}
		</Dropdown>
	);
}
