import { useState, useEffect } from "react";

import Dropdown from "./DD";
import { VideoData as CardProps } from "../../../common/types";
import { DDAnimationTime } from "../dropdown";

interface Props extends CardProps {
	onMouseOver: () => void;
	onMouseOut: () => void;
	showDropdown: boolean;
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
	}, [showDropdown]);

	function handleDDMouseOver() {
		clearTimeout(DDHideTimeout);
		clearTimeout(DDUnmountTimeout);
		props.onMouseOver();
	}

	return showDD ? (
		<Dropdown
			{...props}
			onMouseOver={handleDDMouseOver}
			onMouseOut={props.onMouseOut}
		/>
	) : null;
}
