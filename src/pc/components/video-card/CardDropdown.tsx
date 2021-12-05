import { useEffect, useState } from "react";

import Dropdown from "../dropdown";
import LoadingSpinner from "../loading-spinner";
import { useAppDispatch } from "../../../common/store";
import { UserData, VideoData as CardProps } from "../../../common/types";
import constants from "../../../common/constants";
import { getShortUser } from "../../../common/api/user";
import { notificationActions } from "../../store/slices/notification-slice";

interface Props extends CardProps {
	onMouseOver: () => void;
	onMouseOut: () => void;
}

export default function CardDropdown(props: Props) {
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState<UserData | null>(null);
	const dispatch = useAppDispatch();

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await getShortUser(props.uploader!.username!);
				setUser(res.data);
				setIsLoading(false);
			} catch (err: any) {
				dispatch(
					notificationActions.showNotification({
						type: "error",
						message: err.message
					})
				);
				// !!! do not set loading to false as it will cause type errors !!!
				// just let the component unmount when the user hovers out
			}
		}
		fetchData();
	}, [dispatch, props.uploader]);

	return (
		<Dropdown
			className="video-card-dropdown"
			trigger="hover"
			onMouseOut={props.onMouseOut}
			onMouseOver={props.onMouseOver}
		>
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<>
					<div className="top">
						<div className="rounded-photo">
							<img
								src={constants.pfpLink + "/" + props.uploader!.username}
								alt={props.caption}
							/>
						</div>
						<div className="follow-btn">
							<button>Follow</button>
						</div>
					</div>
					<div className="card-content dd-card-names">
						<header>
							<h4 className="username">{props.uploader!.username}</h4>
							<h5>{props.uploader!.name}</h5>
						</header>
					</div>
					<div className="counts">
						<p>
							<span>{user!.followers}</span> Followers
						</p>
						<p>
							<span>{user!.totalLikes}</span>&nbsp;
							{user!.totalLikes! === 1 ? "Like" : "Likes"}
						</p>
					</div>
					<p className="description">{user!.description}</p>
				</>
			)}
		</Dropdown>
	);
}
