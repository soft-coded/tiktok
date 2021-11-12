import { ReactNode, createElement } from "react";

import classes from "./container.module.scss";

interface ContainerProps {
	children: ReactNode;
	component?: string;
	className?: string;
}

export default function Container({
	children,
	component,
	className
}: ContainerProps) {
	return createElement(
		component ? component : "div",
		{
			className: className
				? `${classes.container} ${className}`
				: classes.container
		},
		children
	);
}
