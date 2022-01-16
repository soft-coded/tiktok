import { useState, useCallback, useEffect, MouseEvent } from "react";

import { followUser } from "../../../common/api/user";
import { useAppSelector, useAppDispatch } from "../../../common/store";
import { notificationActions } from "../../../common/store/slices/notification-slice";
import { fetchFollowing } from "../../store/slices/sidebar-slice";

interface Props {
	isFollowing?: boolean;
	toFollow: string;
	onClick?: (followed: boolean) => any;
	followingClassName?: string;
	followClassName?: string;
	hideUnfollow?: boolean;
}

export default function FollowButton(props: Props) {
	const loggedInAs = useAppSelector(state => state.auth.username);
	const [isFollowing, setIsFollowing] = useState(props.isFollowing);
	const dispatch = useAppDispatch();
	const { toFollow, onClick } = props;

	useEffect(() => {
		setIsFollowing(props.isFollowing);
	}, [props.isFollowing]);

	const follow = useCallback(
		async (e: MouseEvent) => {
			try {
				if (!loggedInAs) throw new Error("Log in to follow " + toFollow);
				const res = await followUser(toFollow, loggedInAs);
				await dispatch(fetchFollowing(loggedInAs)).unwrap();
				setIsFollowing(res.data.followed);
				if (onClick) onClick(res.data.followed);
				dispatch(
					notificationActions.showNotification({
						type: "success",
						message: res.data.followed
							? "You started following " + toFollow
							: "You unfollowed " + toFollow
					})
				);
			} catch (err: any) {
				dispatch(
					notificationActions.showNotification({
						type: "error",
						message: err.message
					})
				);
			}
			e.stopPropagation();
			e.preventDefault();
		},
		[toFollow, loggedInAs, onClick, dispatch]
	);

	return isFollowing ? (
		!props.hideUnfollow ? (
			<button className={props.followingClassName} onClick={follow}>
				Following
			</button>
		) : null
	) : (
		<button className={props.followClassName} onClick={follow}>
			Follow
		</button>
	);
}
