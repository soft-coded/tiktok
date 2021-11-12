import { NavLink } from "react-router-dom";

import "./sidebar.scss";

const suggestedAccounts = [
	{
		username: "kanye",
		name: "Kanye West",
		photo:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Kanye_West_at_the_2009_Tribeca_Film_Festival_%28cropped%29.jpg/1200px-Kanye_West_at_the_2009_Tribeca_Film_Festival_%28cropped%29.jpg"
	},
	{
		username: "iggyazalea",
		name: "Iggy Azalea",
		photo:
			"https://media.glamour.com/photos/5ee135e9079ebb6c40c36741/master/w_2560%2Cc_limit/GettyImages-1164231447.jpg"
	},
	{
		username: "taylorswiftforever",
		name: "Taylor Swift",
		photo:
			"https://pbs.twimg.com/profile_images/1406150077983313921/m3g6cnBY_400x400.jpg"
	},
	{
		username: "nickiminaj",
		name: "Nicki Minaj",
		photo:
			"https://i.pinimg.com/originals/bd/a7/56/bda756955070b57f7f53f478f3aeef42.jpg"
	},
	{
		username: "jackharlow",
		name: "Jack Harlow",
		photo:
			"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/jack-harlow-attends-the-travis-scott-franchise-celebration-news-photo-1618855554."
	}
];

export default function Sidebar() {
	return (
		<div className="sidebar-wrapper">
			<aside className="app-sidebar">
				<nav>
					<NavLink
						to="/"
						className={({ isActive }) =>
							isActive ? "nav-link active" : "nav-link"
						}
					>
						<i className="fas fa-home" />
						<span>For You</span>
					</NavLink>
					<NavLink
						to="/following"
						className={({ isActive }) =>
							isActive ? "nav-link active" : "nav-link"
						}
					>
						<i className="fas fa-user-friends" />
						<span>Following</span>
					</NavLink>
				</nav>
				<div className="log-in">
					<span>
						Log in to follow creators, like videos, and view comments.
					</span>
					<button>Log In</button>
				</div>
				<div className="suggested">
					<header>
						<h5>Suggested accounts</h5>
						<h5 className="see-all">See all</h5>
					</header>
					<div className="accounts">
						{suggestedAccounts.map((acc, i) => (
							<div key={i} className="account-details">
								<div className="image-container">
									<img src={acc.photo} alt={acc.name} />
								</div>
								<div className="name-container">
									<h5>{acc.username}</h5>
									<h6>{acc.name}</h6>
								</div>
							</div>
						))}
					</div>
				</div>
			</aside>
		</div>
	);
}
