import { ReactNode } from "react";

import "./unauthed-page.scss";
import { ComponentProps } from "../../../common/types";

interface Props extends ComponentProps {
	header: string;
	options?: boolean;
	icon: ReactNode;
	description: string;
}

export default function UnauthedPage({
	header,
	icon,
	description,
	options
}: Props) {
	return (
		<div className="unauthed-page">
			<header>
				<div />
				<h4>{header}</h4>
				<div>{options && <i className="fas fa-ellipsis-h" />}</div>
			</header>
			<div className="content">
				<div className="container">
					{icon}
					<p>{description}</p>
					<button className="primary-button">Sign up</button>
				</div>
			</div>
		</div>
	);
}
