import { ReactNode, createElement } from "react";

import classes from "./container.module.scss";
import { joinClasses } from "../../../common/utils";
import { ComponentProps } from "../../../common/types";

interface ContainerProps extends ComponentProps {
	children: ReactNode;
	component?: string;
}

export default function Container({
	children,
	component,
	className
}: ContainerProps) {
	return createElement(
		component ? component : "div",
		{
			className: joinClasses(classes.container, className)
		},
		children
	);
}
