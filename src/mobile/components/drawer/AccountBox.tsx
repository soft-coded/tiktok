import { Link } from "react-router-dom";

import "./drawer.scss";
import { UserData } from "../../../common/types";
import constants from "../../../common/constants";

export default function AccountBox(props: UserData) {
	return (
		<Link to={"/user/" + props.username} className="account-box">
			<div className="rounded-photo">
				<img src={constants.pfpLink + "/" + props.username} alt={props.name} />
			</div>
			<h4>{props.username}</h4>
		</Link>
	);
}
