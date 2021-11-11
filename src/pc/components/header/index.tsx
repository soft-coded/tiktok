import { Link } from "react-router-dom";

import classes from "./header.module.scss";
import Container from "../container";
import SearchBar from "./SearchBar";

export default function Header() {
	return (
		<div className={classes["header-container"]}>
			<Container component="header">
				<ul className={classes.header}>
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
						<button>Log In</button>
					</li>
				</ul>
			</Container>
		</div>
	);
}
