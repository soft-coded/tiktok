import { useEffect, useState, useRef } from "react";

import "./drawer.scss";
import AccountBox from "./AccountBox";
import LoadingSpinner from "../../../common/components/loading-spinner";
import { UserData } from "../../../common/types";
import { errorNotification } from "../../helpers/error-notification";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { getSuggested } from "../../../common/api/feed";
import { getCustom } from "../../../common/api/user";

interface Props {
	setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Drawer({ setShowDrawer }: Props) {
	const dispatch = useAppDispatch();
	const username = useAppSelector(state => state.auth.username);
	const drawerRef = useRef<HTMLElement>(null);
	const backdropRef = useRef<HTMLDivElement>(null);
	const [suggested, setSuggested] = useState<UserData[] | null>(null);
	const [following, setFollowing] = useState<UserData[] | null>(null);

	useEffect(() => {
		if (!drawerRef.current || !backdropRef.current) return;
		drawerRef.current.classList.add("reveal");
		backdropRef.current.classList.add("show");
	}, []);

	useEffect(() => {
		errorNotification(
			async () => {
				const res = await getSuggested(5);
				setSuggested(res.data.users);
			},
			dispatch,
			() => setSuggested([]),
			"Couldn't load suggested accounts:"
		);

		if (!username) {
			setFollowing([]);
			return;
		}
		errorNotification(
			async () => {
				const res = await getCustom({ following: "list" }, username);
				setFollowing(res.data.following);
			},
			dispatch,
			() => setFollowing([]),
			"Couldn't load accounts you follow:"
		);
	}, [dispatch, username]);

	function handleClose() {
		if (!drawerRef.current || !backdropRef.current) return;
		drawerRef.current.classList.remove("reveal");
		drawerRef.current.classList.add("hide");

		backdropRef.current.classList.remove("show");
		backdropRef.current.classList.add("hide");

		setTimeout(() => {
			setShowDrawer(false);
		}, 300);
	}

	return (
		<>
			<div
				ref={backdropRef}
				className="backdrop drawer-backdrop"
				onClick={handleClose}
			/>
			<aside ref={drawerRef} className="app-drawer">
				<div className="drawer-header">
					<div className="image-container">
						<img
							src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/TikTok_logo.svg/2560px-TikTok_logo.svg.png"
							alt="tiktok logo"
						/>
					</div>
				</div>
				<div className="accounts">
					<h5>Suggested accounts</h5>
					<div className="content">
						{!suggested ? (
							<LoadingSpinner className="spinner" />
						) : (
							suggested.map((acc, i) => <AccountBox key={i} {...acc} />)
						)}
					</div>
				</div>
				<div className="accounts following">
					<h5>Following</h5>
					{!following ? (
						<LoadingSpinner className="spinner" />
					) : following.length === 0 ? (
						<div className="no-following">
							Accounts you follow will appear here
						</div>
					) : (
						following.map((acc, i) => <AccountBox key={i} {...acc} />)
					)}
				</div>
			</aside>
		</>
	);
}
