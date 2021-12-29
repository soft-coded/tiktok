import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import classes from "./header.module.scss";
import Dropdown from "../dropdown";
import { UserNotification } from "../../../common/types";
import { useAppSelector, useAppDispatch } from "../../../common/store";
import { notificationActions } from "../../store/slices/notification-slice";
import { getCustom } from "../../../common/api/user";
import LoadingSpinner from "../loading-spinner";
import constants from "../../../common/constants";
import { convertToDate, joinClasses } from "../../../common/utils";

interface Props {
	setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserNotifications({ setShowDropdown }: Props) {
	const dispatch = useAppDispatch();
	const [notifs, setNotifs] = useState<null | UserNotification[]>(null);
	const { username, token } = useAppSelector(state => state.auth);

	useEffect(() => {
		async function fetchNotifs() {
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
		}
		fetchNotifs();
	}, [username, token, dispatch]);
	console.log(notifs);
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
					<div key={i} className={classes["notif-container"]}>
						<div
							className={joinClasses("rounded-photo", classes["rounded-photo"])}
						>
							<img
								src={constants.pfpLink + "/" + notif.by.username}
								alt={notif.by.username}
							/>
						</div>
						<div className={classes["content"]}>
							<Link to={"/user/" + notif.by.username}>
								<h4>{notif.by.username}</h4>
							</Link>
							<p className="clamp-text">{notif.message}</p>
							<span>{convertToDate(notif.createdAt)}</span>
						</div>
						{notif.type !== "followed" && (
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
					</div>
				))
			)}
		</Dropdown>
	);
}
