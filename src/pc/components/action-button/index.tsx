import { ReactNode } from "react";

import classes from "./action-button.module.scss";
import { ComponentProps, joinClasses } from "../../../common/utils";

interface ABProps extends ComponentProps {
	number: string;
	icon: ReactNode;
}

export default function ActionButton({ number, icon, className }: ABProps) {
	return (
		<div className={joinClasses(classes["action-btn-container"], className)}>
			<div className={joinClasses(classes["action-btn"], "action-btn")}>
				{icon}
			</div>
			<span>{number}</span>
		</div>
	);
}
