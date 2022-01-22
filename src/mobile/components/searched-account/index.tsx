import { Link } from "react-router-dom";

import classes from "./searched-account.module.scss";
import { UserData } from "../../../common/types";
import { joinClasses } from "../../../common/utils";
import constants from "../../../common/constants";

export default function SearchedAccount(props: UserData) {
	return (
		<Link to={"/user/" + props.username} className={classes["account"]}>
			<div className={joinClasses("rounded-photo", classes["pfp"])}>
				<img src={constants.pfpLink + "/" + props.username} alt={props.name} />
			</div>
			<div className={classes["content"]}>
				<h4>{props.username}</h4>
				<h5>
					{props.name}&nbsp;
					<span>
						• {props.followers}&nbsp;
						{props.followers === 1 ? "Follower" : "Followers"}
					</span>
				</h5>
				<p>{props.description}</p>
			</div>
		</Link>
	);
}
