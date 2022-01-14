import { ReactNode } from "react";

import classes from "./page-with-navbar.module.scss";
import { joinClasses } from "../../../common/utils";
import Navbar from "../navbar";

interface Props {
	children: ReactNode;
	wrapperClassName?: string;
	containerClassName?: string;
}

export default function PageWithNavbar({
	children,
	wrapperClassName,
	containerClassName
}: Props) {
	return (
		<div className={joinClasses(classes["page"], wrapperClassName)}>
			<div className={joinClasses(classes["container"], containerClassName)}>
				{children}
			</div>
			<Navbar />
		</div>
	);
}
