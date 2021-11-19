import Dropdown from "../dropdown";
import { PostData as CardProps } from "../../../common/utils";

interface Props extends CardProps {
	onMouseOver: () => void;
	onMouseOut: () => void;
}

export default function CardDropdown(props: Props) {
	return (
		<Dropdown
			className="video-card-dropdown"
			trigger="hover"
			onMouseOut={props.onMouseOut}
			onMouseOver={props.onMouseOver}
		>
			<div className="top">
				<div className="rounded-photo">
					<img src={props.profilePhoto} alt={props.name} />
				</div>
				<div className="follow-btn">
					<button>Follow</button>
				</div>
			</div>
			<div className="card-content dd-card-names">
				<header>
					<h4 className="username">{props.username}</h4>
					<h5>{props.name}</h5>
				</header>
			</div>
			<div className="counts">
				<p>
					<span>120M</span> Followers
				</p>
				<p>
					<span>100M</span> Likes
				</p>
			</div>
			<p className="description">
				The absolute throat goat and I mean that shit. No one can come close to
				me when it comes to gulping down a fat one. Oh, and also the PM of India
				or whatever who cares lol bye
			</p>
		</Dropdown>
	);
}
