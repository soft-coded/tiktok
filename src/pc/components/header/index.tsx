import { Link } from "react-router-dom";

import classes from "./header.module.scss";
import Container from "../container";

export default function Header() {
	return (
		<Container component="header">
			<ul className={classes.header}>
				<li>
					<Link to="/">
						<div className="image-container">
							<img
								src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/TikTok_logo.svg/2560px-TikTok_logo.svg.png"
								alt="TikTok logo"
							/>
						</div>
					</Link>
				</li>
			</ul>
		</Container>
	);
}
