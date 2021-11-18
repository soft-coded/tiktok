import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import classes from "./header.module.scss";
import Container from "../container";
import SearchBar from "./SearchBar";
import { authModalActions } from "../../store/slices/auth-modal-slice";
import { joinClasses } from "../../../common/utils";

export default function Header() {
	const dispatch = useDispatch();

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
					<li className={classes["buttons"]}>
						<div>
							<a href="/">Upload</a>
						</div>
						<button className="primary-button" onClick={handleClick}>
							Log In
						</button>
					</li>
				</Container>
			</header>
		</div>
	);
}
