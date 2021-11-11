import { ReactNode, createElement } from "react";

import classes from "./container.module.scss";

interface ContainerProps {
	children: ReactNode;
	component?: string;
}

export default function Container({ children, component }: ContainerProps) {
	return createElement(
		component ? component : "div",
		{ className: classes.container },
		children
	);
}
