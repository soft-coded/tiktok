import { useEffect, useRef } from "react";

import classes from "./notification.module.scss";
import { useAppDispatch } from "../../store";
import { joinClasses } from "../../utils";
import { notificationActions } from "../../store/slices/notification-slice";

export interface NotificationProps {
	type: "success" | "error" | "warning" | "info";
	message: string;
	isMobile?: boolean;
}

const notifDuration = 5000; // stays visible for 5s
const notifAnimDuration = 1000; // hide animation plays for 1s

export default function Notification({
	type,
	message,
	isMobile
}: NotificationProps) {
	const dispatch = useAppDispatch();
	const notifRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!notifRef.current) return;
		const classList = notifRef.current.classList;
		classList.add(classes["reveal"]);

		const hideTimeout = setTimeout(() => {
			classList.remove(classes["reveal"]);
			classList.add(classes["hide"]);
		}, notifDuration);
		const removeTimeout = setTimeout(() => {
			dispatch(notificationActions.hideNotification());
		}, notifAnimDuration + notifDuration);

		return () => {
			clearTimeout(hideTimeout);
			clearTimeout(removeTimeout);
		};
	}, [dispatch]);

	return (
		<div
			ref={notifRef}
			className={joinClasses(
				classes["notification"],
				isMobile && classes["mobile"],
				classes[type]
			)}
		>
			{message}
		</div>
	);
}
