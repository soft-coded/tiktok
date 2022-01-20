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
import { navbarActions } from "../../store/slices/navbar-slice";

let hadNewNotifs: boolean;

export default function Notifications() {
	const dispatch = useAppDispatch();
	const {
		username,
		isAuthenticated: isAuthed,
		token
	} = useAppSelector(state => state.auth);
	const hasNewNotifs = useAppSelector(
		state => state.mobile.navbar.hasNewNotifs
	);
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
		if (!isAuthed) return;
		fetchNotifs();
	}, [fetchNotifs, isAuthed]);

	useEffect(() => {
		if (!isAuthed) return;
		hadNewNotifs = hasNewNotifs;
		if (hasNewNotifs) dispatch(navbarActions.hasReadNotifs());

		return () => {
			if (!hadNewNotifs) return;
			readAllNotifs(username!, token!).catch(err =>
				console.error("Couldn't read all notifications", err)
			);
		};
	}, [isAuthed, username, token, hasNewNotifs, dispatch]);

	return isAuthed ? (
		<PageWithNavbar containerClassName="notifications-page">
			<header>Notifications</header>
			<div className="content">
				{!notifs ? (
					<LoadingSpinner />
				) : notifs.length === 0 ? (
					<div className="no-notifs">No notifications</div>
				) : (
					notifs.map((notif, i) => (
						<NotificationBox
							key={i}
							{...notif}
							setNotifs={setNotifs}
							fetchNotifs={fetchNotifs}
						/>
					))
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
