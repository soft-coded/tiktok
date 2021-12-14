import { useEffect, useState } from "react";

import "./user-dropdown.scss";
import Dropdown from "../dropdown";
import LoadingSpinner from "../loading-spinner";
import { useAppDispatch } from "../../../common/store";
import { UserData } from "../../../common/types";
import constants from "../../../common/constants";
import { getShortUser } from "../../../common/api/user";
import { notificationActions } from "../../store/slices/notification-slice";

interface Props {
	onMouseOver: () => void;
	onMouseOut: () => void;
	username: string;
}

export default function CardDropdown(props: Props) {
	const [user, setUser] = useState<UserData | null>(null);
	const dispatch = useAppDispatch();

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await getShortUser(props.username);
				setUser(res.data);
			} catch (err: any) {
				dispatch(
					notificationActions.showNotification({
						type: "error",
						message: err.message
					})
				);
			}
		}
		fetchData();
	}, [dispatch, props.username]);

	return (
		<Dropdown
			className="user-dropdown"
			trigger="hover"
			onMouseOut={props.onMouseOut}
			onMouseOver={props.onMouseOver}
		>
			{!user ? (
				<LoadingSpinner />
			) : (
				<>
					<div className="top">
						<div className="rounded-photo">
							<img
								src={constants.pfpLink + "/" + user.username}
								alt={user.name}
							/>
						</div>
						<div className="follow-btn">
							<button>Follow</button>
						</div>
					</div>
					<div className="card-content dd-card-names">
						<header className="names-header">
							<h4 className="username">{user.username}</h4>
							<h5>{user.name}</h5>
						</header>
					</div>
					<div className="counts">
						<p>
							<span>{user.followers}</span>&nbsp;
							{user.followers! === 1 ? "Follower" : "Followers"}
						</p>
						<p>
							<span>{user.totalLikes}</span>&nbsp;
							{user.totalLikes! === 1 ? "Like" : "Likes"}
						</p>
					</div>
					<p className="description">{user.description}</p>
				</>
			)}
		</Dropdown>
	);
}
