import { ReactNode } from "react";

import classes from "./input.module.scss";
import { joinClasses } from "../../../common/utils";

interface InputProps {
	type?: "text" | "password" | "email" | "number";
	placeholder?: string;
	className?: string;
	icon?: ReactNode;
}

export default function Input({
	type,
	placeholder,
	className,
	icon
}: InputProps) {
	return (
		<div className={joinClasses(classes["app-input-field"], className)}>
			{icon}
			<input type={type ? type : "text"} placeholder={placeholder} />
		</div>
	);
}
