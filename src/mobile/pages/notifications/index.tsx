import { useCallback, useEffect, useState } from "react";

import PageWithNavbar from "../../components/page-with-navbar";
import "./notifications.scss";
import UnauthedPage from "../../components/unauthed-page";
import NotificationBox from "../../components/notification-box";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { errorNotification } from "../../helpers/error-notification";
import { UserNotification } from "../../../common/types";
import { getCustom, readAllNotifs } from "../../../common/api/user";
import LoadingSpinner from "../../../common/components/loading-spinner";

export default function Notifications() {
	const dispatch = useAppDispatch();
	const {
		username,
		isAuthenticated: isAuthed,
		token
	} = useAppSelector(state => state.auth);
	const [notifs, setNotifs] = useState<UserNotification[] | null>(null);

	const fetchNotifs = useCallback(() => {
		errorNotification(
			async () => {
				const res = await getCustom({ notifications: "1" }, username!);
				setNotifs(res.data.notifications);
			},
			dispatch,
			() => setNotifs([]),
			"Couldn't load notifications:"
		);
	}, [dispatch, username]);

	useEffect(() => {
		fetchNotifs();
	}, [fetchNotifs]);

	useEffect(() => {
		if (!isAuthed) return;

		return () => {
			readAllNotifs(username!, token!).catch(err =>
				console.error("Couldn't read all notifications.", err)
			);
		};
	}, [isAuthed, username, token]);

	return isAuthed ? (
		<PageWithNavbar containerClassName="notifications-page">
			<header>Notifications</header>
			<div className="content">
				{!notifs ? (
					<LoadingSpinner />
				) : (
					notifs.map((notif, i) => <NotificationBox key={i} {...notif} />)
				)}
			</div>
		</PageWithNavbar>
	) : (
		<UnauthedPage
			header="Notifications"
			icon={<i className="fas fa-bell" />}
			description="Log in to see your notifications"
		/>
	);
}
