import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import classes from "./header.module.scss";
import Container from "../container";
import SearchBar from "./SearchBar";
import Dropdown from "../../../common/components/dropdown";
import UserNotifications from "./UserNotifications";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { authModalActions } from "../../../common/store/slices/auth-modal-slice";
import { authActions } from "../../../common/store/slices/auth";
import { joinClasses } from "../../../common/utils";
import { hasNewNotifs, readAllNotifs } from "../../../common/api/user";
import constants from "../../../common/constants";
import { notificationActions } from "../../../common/store/slices/notification-slice";

export default function Header() {
	const [showOptions, setShowOptions] = useState(false);
	const [showNotifs, setShowNotifs] = useState(false);
	const [hasNotifs, setHasNotifs] = useState(false);
	const [darkTheme, setDarkTheme] = useState(false);
	const dispatch = useAppDispatch();
	const {
		isAuthenticated: isAuthed,
		username,
		token
	} = useAppSelector(state => state.auth);

	useEffect(() => {
		if (!username) return;

		async function fetchHasNew() {
			try {
				const res = await hasNewNotifs(username!, token!);
				setHasNotifs(res.data.hasNew);
			} catch (err: any) {
				dispatch(
					notificationActions.showNotification({
						type: "error",
						message: "Couldn't fetch new notifications: " + err.message
					})
				);
			}
		}
		fetchHasNew();
	}, [dispatch, username, token]);

	useEffect(() => {
		let usesDarkTheme: any = localStorage.getItem("usesDarkTheme");
		if (usesDarkTheme) {
			usesDarkTheme = JSON.parse(usesDarkTheme);
		} else {
			usesDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
			localStorage.setItem("usesDarkTheme", JSON.stringify(usesDarkTheme));
		}

		document.documentElement.className = usesDarkTheme ? "dark" : "light";
		setDarkTheme(usesDarkTheme);
	}, []);

	function handleShowModal() {
		dispatch(authModalActions.showModal());
	}

	function handleLogOut() {
		setShowOptions(false);
		dispatch(authActions.logout());
	}

	function handleNotifsClose() {
		setShowNotifs(false);
		if (hasNotifs) {
			setHasNotifs(false);
			readAllNotifs(username!, token!).catch(err => console.error(err));
		}
	}

	function changeTheme() {
		document.documentElement.className = darkTheme ? "light" : "dark";
		setDarkTheme(!darkTheme);
		localStorage.setItem("usesDarkTheme", JSON.stringify(!darkTheme));
	}

	return (
		<div className={joinClasses(classes["header-wrapper"], "app-header")}>
			<header className={classes["header-container"]}>
				<Container component="ul" className={classes.header}>
					<li>
						<Link to="/" className={classes.logo}>
							<div className="image-container">
								<img
									src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/TikTok_logo.svg/2560px-TikTok_logo.svg.png"
									alt="TikTok logo"
								/>
							</div>
						</Link>
					</li>
					<li>
						<SearchBar />
					</li>
					{isAuthed ? (
						<li className={classes["icons"]}>
							<Link to="/upload">
								<div className={classes["icon"]} title="Upload video">
									<i className="fas fa-video" />
								</div>
							</Link>
							<div className={classes["inbox"]} title="Inbox">
								<i
									className={joinClasses("fas fa-envelope", classes["icon"])}
									onClick={() => setShowNotifs(true)}
								/>
								{hasNotifs && <span className={classes["dot"]} />}
								{showNotifs && (
									<UserNotifications setShowDropdown={handleNotifsClose} />
								)}
							</div>
							<div
								className={joinClasses(
									"rounded-photo",
									classes["icon"],
									classes["profile-icon"]
								)}
								onClick={() => setShowOptions(true)}
							>
								<img src={constants.pfpLink + "/" + username} alt="pfp" />
							</div>
							{showOptions && (
								<Dropdown
									className={classes["options-dropdown"]}
									setShowDropdown={setShowOptions}
								>
									<Link
										to={"/user/" + username}
										className="hoverable"
										onClick={() => setShowOptions(false)}
									>
										<i className="fas fa-user" />
										<span>View profile</span>
									</Link>
									<Link
										to="/edit-profile"
										className="hoverable"
										onClick={() => setShowOptions(false)}
									>
										<i className="fas fa-user-edit" />
										<span>Edit profile</span>
									</Link>
									<div className="hoverable" onClick={changeTheme}>
										<i
											className={joinClasses(
												"fas",
												darkTheme ? "fa-sun" : "fa-moon"
											)}
										/>
										<span>Change theme</span>
									</div>
									<div className="hoverable" onClick={handleLogOut}>
										<i className="fas fa-sign-out-alt" />
										<span>Log out</span>
									</div>
								</Dropdown>
							)}
						</li>
					) : (
						<li className={classes["buttons"]}>
							<div onClick={handleShowModal}>
								<span>Upload</span>
							</div>
							<button className="primary-button" onClick={handleShowModal}>
								Log In
							</button>
						</li>
					)}
				</Container>
			</header>
		</div>
	);
}
