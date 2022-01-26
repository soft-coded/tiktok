import { useRef } from "react";
import { Link } from "react-router-dom";

import classes from "./suggestion-card.module.scss";
import FollowButton from "../follow-button";
import { UserData, ComponentProps } from "../../../common/types";
import { joinClasses } from "../../../common/utils";
import constants from "../../../common/constants";

interface CardProps extends UserData, ComponentProps {}

export default function SuggestionCard(props: CardProps) {
	const videoRef = useRef<HTMLVideoElement>(null);

	return (
		<Link to={"/user/" + props.username}>
			<div
				className={joinClasses(
					classes["suggestion-card-container"],
					props.className
				)}
				onMouseOver={() => videoRef.current?.play()}
				onMouseOut={() => videoRef.current?.pause()}
			>
				<div className={classes["video-container"]}>
					<video
						ref={videoRef}
						src={
							constants.videoLink +
							"/" +
							(props.videos as any).uploaded[0] +
							"#t=0.1"
						}
						loop
						playsInline
						muted
					/>
					<div className={classes["info-container"]}>
						<div
							className={joinClasses("rounded-photo", classes["rounded-photo"])}
						>
							<img
								src={constants.pfpLink + "/" + props.username}
								alt={props.name}
							/>
						</div>
						<strong>{props.username}</strong>
						<p>{props.name}</p>
						<FollowButton
							toFollow={props.username!}
							followClassName="primary-button"
							followingClassName="secondary-button"
						/>
					</div>
				</div>
			</div>
		</Link>
	);
}
