import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import classes from "./header.module.scss";
import Container from "../container";
import SearchBar from "./SearchBar";
import Dropdown from "../dropdown";
import { authModalActions } from "../../store/slices/auth-modal-slice";
import { joinClasses } from "../../../common/utils";
import { RootState } from "../../../common/store";

const options = [
	{ icon: <i className="fas fa-user" />, label: "View profile" },
	{ icon: <i className="fas fa-sign-out-alt" />, label: "Log out" }
];

export default function Header() {
	const [showOptions, setShowOptions] = useState(false);
	const dispatch = useDispatch();
	const isAuthed = useSelector<RootState, any>(
		state => state.auth.isAuthenticated
	);

	function handleClick() {
		dispatch(authModalActions.showModal());
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
							<div className={classes["icon"]}>
								<i className="fas fa-video" />
							</div>
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
									{options.map((option, i) => (
										<div key={i} className="hoverable">
											{option.icon}
											<span>{option.label}</span>
										</div>
									))}
								</Dropdown>
							)}
						</li>
					) : (
						<li className={classes["buttons"]}>
							<div onClick={handleClick}>
								<span>Upload</span>
							</div>
							<button className="primary-button" onClick={handleClick}>
								Log In
							</button>
						</li>
					)}
				</Container>
			</header>
		</div>
	);
}
