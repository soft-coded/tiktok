import classes from "./notification.module.scss";
import { joinClasses } from "../../../common/utils";
import Container from "../container";

export interface NotificationProps {
	type: "success" | "error" | "warning" | "info";
	message: string;
}

export default function Notification({ type, message }: NotificationProps) {
	return (
		<Container
			className={joinClasses(classes["notif-container"], classes[type])}
		>
			{message}
		</Container>
	);
}
