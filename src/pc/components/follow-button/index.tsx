import { useState, useCallback } from "react";

import { followUser } from "../../../common/api/user";
import { useAppSelector, useAppDispatch } from "../../../common/store";
import { notificationActions } from "../../store/slices/notification-slice";
import { fetchFollowing } from "../../store/slices/sidebar-slice";

interface Props {
	isFollowing: boolean;
	username: string;
	onClick?: () => any;
	followingClassName?: string;
	followClassName?: string;
}

export default function FollowButton(props: Props) {
	const loggedInAs = useAppSelector(state => state.auth.username);
	const [isFollowing, setIsFollowing] = useState(props.isFollowing);
	const dispatch = useAppDispatch();
	const { username, onClick } = props;

	const follow = useCallback(async () => {
		try {
			const res = await followUser(username!, loggedInAs);
			await dispatch(fetchFollowing(loggedInAs!)).unwrap();
			setIsFollowing(res.data.followed);
			if (onClick) onClick();
		} catch (err: any) {
			dispatch(
				notificationActions.showNotification({
					type: "error",
					message: err.message
				})
			);
		}
	}, [username, loggedInAs, onClick, dispatch]);

	return isFollowing ? (
		<button className={props.followingClassName} onClick={follow}>
			Following
		</button>
	) : (
		<button className={props.followClassName} onClick={follow}>
			Follow
		</button>
	);
}
