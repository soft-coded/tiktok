import { useEffect, useCallback, useState } from "react";
import { NavLink, Link } from "react-router-dom";

import "./sidebar.scss";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { authModalActions } from "../../../common/store/slices/auth-modal-slice";
import { joinClasses } from "../../../common/utils";
import { notificationActions } from "../../../common/store/slices/notification-slice";
import {
	fetchFollowing,
	fetchSuggested
} from "../../store/slices/sidebar-slice";
import constants from "../../../common/constants";
import LoadingSpinner from "../../../common/components/loading-spinner";

export default function Sidebar() {
	const dispatch = useAppDispatch();
	const { isAuthenticated: isAuthed, username } = useAppSelector(
		state => state.auth
	);
	const { following: followingList, suggested: suggestedAccounts } =
		useAppSelector(state => state.pc.sidebar);
	const [showingAll, setShowingAll] = useState(false);

	useEffect(() => {
		if (!isAuthed || followingList) return;
		async function getFollowing() {
			try {
				await dispatch(fetchFollowing(username!)).unwrap();
			} catch (err: any) {
				dispatch(
					notificationActions.showNotification({
						type: "error",
						message: "Couldn't fetch users you follow: " + err.message
					})
				);
			}
		}
		getFollowing();
		// eslint-disable-next-line
	}, [isAuthed, username, dispatch]);

	const getSuggested = useCallback(
		async (limit: number) => {
			try {
				await dispatch(fetchSuggested(limit)).unwrap();
			} catch (err: any) {
				dispatch(
					notificationActions.showNotification({
						type: "error",
						message: "Couldn't fetch suggested accounts: " + err.message
					})
				);
			}
		},
		[dispatch]
	);

	useEffect(() => {
		if (suggestedAccounts) return;
		getSuggested(15);
		// eslint-disable-next-line
	}, [getSuggested]);

	function handleLogIn() {
		dispatch(authModalActions.showModal());
	}

	return (
		<div className="sidebar-wrapper">
			<aside className="app-sidebar">
				<nav>
					<NavLink
						to="/"
						className={({ isActive }) =>
							joinClasses("hoverable", "nav-link", isActive && "active")
						}
					>
						<i className="fas fa-home" />
						<span>For You</span>
					</NavLink>
					<NavLink
						to="/following"
						className={({ isActive }) =>
							joinClasses("hoverable", "nav-link", isActive && "active")
						}
					>
						<i className="fas fa-user-friends" />
						<span>Following</span>
					</NavLink>
				</nav>
				{!isAuthed && (
					<div className="log-in">
						<span>
							Log in to follow creators, like videos, and view comments.
						</span>
						<button className="secondary-button" onClick={handleLogIn}>
							Log In
						</button>
					</div>
				)}
				<div className="suggested">
					<header>
						<h5>Suggested accounts</h5>
					</header>
					<div className="accounts">
						{suggestedAccounts ? (
							suggestedAccounts
								.slice(0, showingAll ? undefined : 5)
								.map((acc, i) => (
									<Link key={i} to={"/user/" + acc.username}>
										<div className="hoverable account-details">
											<div className="rounded-photo">
												<img
													src={constants.pfpLink + "/" + acc.username}
													alt={acc.name}
												/>
											</div>
											<div className="name-container">
												<h5>{acc.username}</h5>
												<h6>{acc.name}</h6>
											</div>
										</div>
									</Link>
								))
						) : (
							<LoadingSpinner className="spinner" />
						)}
					</div>
					<h5
						className="clickable see-all"
						onClick={() => setShowingAll(!showingAll)}
					>
						{showingAll ? "See less" : "See all"}
					</h5>
				</div>
				{isAuthed && (
					<div className="following">
						<header>
							<h5>Following</h5>
						</header>
						<div className="accounts">
							{followingList ? (
								followingList.length > 0 ? (
									followingList.map((acc, i) => (
										<Link key={i} to={"/user/" + acc.username}>
											<div
												className={joinClasses("hoverable", "account-details")}
											>
												<div className="rounded-photo">
													<img
														src={constants.pfpLink + "/" + acc.username}
														alt={acc.name}
													/>
												</div>
												<div className="name-container">
													<h5>{acc.username}</h5>
													<h6>{acc.name}</h6>
												</div>
											</div>
										</Link>
									))
								) : (
									<span className="no-following">
										Accounts you follow will appear here
									</span>
								)
							) : (
								<LoadingSpinner className="spinner" />
							)}
						</div>
					</div>
				)}
				<div className="made-with">
					<p>Made with ❤️ by Shrutanten</p>
					<a
						href="https://github.com/soft-coded"
						target="_blank"
						rel="noreferrer"
					>
						github: @soft-coded
					</a>
				</div>
			</aside>
		</div>
	);
}
