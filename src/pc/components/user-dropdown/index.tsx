import { useState, useEffect } from "react";

import Dropdown from "./DD";
import { DDAnimationTime } from "../../../common/components/dropdown";

interface Props {
	onMouseOver: () => void;
	onMouseOut: () => void;
	onFollow?: (followed: boolean) => void;
	showDropdown: boolean;
	username: string;
}

const DDTimeThreshold = 600; // time after which dropdown gets unmounted
let DDMountTimeout: NodeJS.Timeout,
	DDHideTimeout: NodeJS.Timeout,
	DDUnmountTimeout: NodeJS.Timeout;

export default function UserDropdown(props: Props) {
	const [showDD, setShowDD] = useState(false);
	const { showDropdown } = props;

	useEffect(() => {
		if (showDropdown) {
			clearTimeout(DDHideTimeout);
			clearTimeout(DDUnmountTimeout);
			DDMountTimeout = setTimeout(() => setShowDD(true), DDTimeThreshold);
		} else {
			clearTimeout(DDMountTimeout);
			const card = document.querySelector(".user-dropdown");
			if (card) {
				// hide timeout
				DDHideTimeout = setTimeout(
					() => card.classList.add("hide"),
					DDTimeThreshold
				);
				// remove timeout
				DDUnmountTimeout = setTimeout(
					() => setShowDD(false),
					DDAnimationTime + DDTimeThreshold
				);
			}
		}

		return () => {
			clearTimeout(DDMountTimeout);
			clearTimeout(DDHideTimeout);
			clearTimeout(DDUnmountTimeout);
		};
	}, [showDropdown]);

	return showDD ? <Dropdown {...props} /> : null;
}
