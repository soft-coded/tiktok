import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import classes from "./header.module.scss";
import Container from "../container";
import SearchBar from "./SearchBar";
import Dropdown from "../dropdown";
import { authModalActions } from "../../store/slices/auth-modal-slice";
import { authActions } from "../../../common/store/slices/auth";
import { joinClasses } from "../../../common/utils";
import { RootState } from "../../../common/store";

export default function Header() {
	const [showOptions, setShowOptions] = useState(false);
	const dispatch = useDispatch();
	const { isAuthenticated: isAuthed, username } = useSelector<RootState, any>(
		state => state.auth
	);

	function handleShowModal() {
		dispatch(authModalActions.showModal());
	}

	function handleLogOut() {
		setShowOptions(false);
		dispatch(authActions.logout());
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
								<div className={classes["icon"]}>
									<i className="fas fa-video" />
								</div>
							</Link>
							<div
								className={joinClasses(
									"rounded-photo",
									classes["icon"],
									classes["profile-icon"]
								)}
								onClick={() => setShowOptions(true)}
							>
								<img
									src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Narendra_Modi_2021.jpg/1200px-Narendra_Modi_2021.jpg"
									alt="pfp"
								/>
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
