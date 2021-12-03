import { useEffect } from "react";

import classes from "./notification.module.scss";
import { useAppDispatch } from "../../../common/store";
import { joinClasses } from "../../../common/utils";
import Container from "../container";
import { notificationActions } from "../../store/slices/notification-slice";
import constants from "../../../common/constants";

export interface NotificationProps {
	type: "success" | "error" | "warning" | "info";
	message: string;
}

export default function Notification({ type, message }: NotificationProps) {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const container = document.querySelector("." + classes["notif-container"])!;
		const hideTimeout = setTimeout(() => {
			container.classList.add(classes["hide"]);
		}, constants.notificationDuration);
		// the hide animation plays for 1 second
		const removeTimeout = setTimeout(() => {
			dispatch(notificationActions.hideNotification());
		}, constants.notificationAnimDuration + constants.notificationDuration);

		return () => {
			clearTimeout(hideTimeout);
			clearTimeout(removeTimeout);
		};
	}, [dispatch]);

	return (
		<Container
			className={joinClasses(classes["notif-container"], classes[type])}
		>
			{message}
		</Container>
	);
}
