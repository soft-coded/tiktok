import { useEffect, useRef, ReactNode } from "react";

import classes from "./dropdown.module.scss";
import { ComponentProps, joinClasses } from "../../../common/utils";
import { handleClickOutside } from "../../../common/utils";

export interface DropdownProps extends ComponentProps {
	children: ReactNode;
	setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
	trigger?: "click" | "hover";
}

export default function Dropdown({
	className,
	children,
	setShowDropdown,
	trigger = "click"
}: DropdownProps) {
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (trigger === "click") {
			const dropdown = dropdownRef.current!;
			let timeOut: NodeJS.Timeout;

			const eventRemover = handleClickOutside(dropdown, () => {
				dropdown.classList.add(classes["hide"]);
				timeOut = setTimeout(() => setShowDropdown(false), 99);
			});

			return () => {
				eventRemover();
				clearTimeout(timeOut);
			};
		}
	}, [setShowDropdown]);

	return (
		<div
			className={joinClasses(classes["dropdown"], className)}
			ref={dropdownRef}
		>
			{children}
		</div>
	);
}
