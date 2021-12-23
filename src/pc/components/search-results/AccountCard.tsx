import classes from "./search-results.module.scss";
import { Link } from "react-router-dom";
import { UserData } from "../../../common/types";
import { joinClasses } from "../../../common/utils";
import constants from "../../../common/constants";

export default function AccountCard(props: UserData) {
	return (
		<Link
			to={"/user/" + props.username}
			className={joinClasses("hoverable clickable", classes["account-card"])}
		>
			<div className={joinClasses("rounded-photo", classes["pfp"])}>
				<img src={constants.pfpLink + "/" + props.username} alt={props.name} />
			</div>
			<div className={classes["card-content"]}>
				<h3 className="break-word">{props.username}</h3>
				<h5>
					{props.name} | <span>{props.followers} </span>
					{props.followers === 1 ? "Follower" : "Followers"}
				</h5>
				<p className="break-word">{props.description}</p>
			</div>
		</Link>
	);
}
