import { useEffect, useRef, ReactNode } from "react";

import classes from "./dropdown.module.scss";
import { joinClasses, handleClickOutside } from "../../utils";
import { ComponentProps } from "../../types";

export interface DropdownProps extends ComponentProps {
	children: ReactNode;
	setShowDropdown?: React.Dispatch<React.SetStateAction<boolean>>;
	trigger?: "click" | "hover";
	onMouseOver?: () => void;
	onMouseOut?: () => void;
}

export const DDAnimationTime = 100;

export default function Dropdown({
	className,
	children,
	setShowDropdown,
	trigger = "click",
	onMouseOver,
	onMouseOut
}: DropdownProps) {
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (trigger === "click") {
			const dropdown = dropdownRef.current!;
			let timeOut: NodeJS.Timeout;

			const eventRemover = handleClickOutside(dropdown, () => {
				dropdown.classList.add(classes["hide"]);
				timeOut = setTimeout(() => setShowDropdown!(false), DDAnimationTime);
			});

			return () => {
				eventRemover();
				clearTimeout(timeOut);
			};
		}
	}, [setShowDropdown, trigger]);

	return (
		<div
			className={joinClasses(classes["dropdown"], className)}
			ref={dropdownRef}
			onMouseOver={onMouseOver}
			onMouseOut={onMouseOut}
		>
			{children}
		</div>
	);
}
