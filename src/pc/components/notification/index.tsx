import { useEffect } from "react";
import { useDispatch } from "react-redux";

import classes from "./notification.module.scss";
import { joinClasses } from "../../../common/utils";
import Container from "../container";
import { notificationActions } from "../../store/slices/notification-slice";

export interface NotificationProps {
	type: "success" | "error" | "warning" | "info";
	message: string;
}

export default function Notification({ type, message }: NotificationProps) {
	const dispatch = useDispatch();

	useEffect(() => {
		const container = document.querySelector("." + classes["notif-container"])!;
		const hideTimeout = setTimeout(() => {
			container.classList.add(classes["hide"]);
		}, 5000);
		// the hide animation plays for 1 second
		const removeTimeout = setTimeout(() => {
			dispatch(notificationActions.hideNotification());
		}, 5999);

		return () => {
			clearTimeout(hideTimeout);
			clearTimeout(removeTimeout);
		};
	}, []);

	return (
		<Container
			className={joinClasses(classes["notif-container"], classes[type])}
		>
			{message}
		</Container>
	);
}
