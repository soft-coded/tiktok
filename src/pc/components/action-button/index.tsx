import { ReactNode } from "react";

import classes from "./action-button.module.scss";
import { joinClasses } from "../../../common/utils";
import { ComponentProps } from "../../../common/types";

interface ABProps extends ComponentProps {
	number: string | number;
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
