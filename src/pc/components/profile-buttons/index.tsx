import { useRef, useEffect } from "react";

import "./profile-buttons.scss";

export default function ProfileButtons() {
	const buttonsRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const container = buttonsRef.current!;
		const buttons = container.querySelectorAll("button");
		const bar = container.querySelector("span")!;
		let prevPosition = bar.style.left;

		function handleButton(e: any) {
			if (e.target.classList.contains("active")) return;
			if (e.type === "mouseover") {
				bar.style.left = `${50 * +e.target.dataset.position}%`;
			} else if (e.type === "mouseout") {
				bar.style.left = prevPosition;
			} else {
				container.querySelector("button.active")!.className = "";
				e.target.className = "active";
				prevPosition = `${50 * +e.target.dataset.position}%`;
			}
		}

		buttons.forEach(button => {
			button.addEventListener("mouseover", handleButton);
			button.addEventListener("mouseout", handleButton);
			button.addEventListener("click", handleButton);
		});

		return () =>
			buttons.forEach(button => {
				button.removeEventListener("mouseover", handleButton);
				button.removeEventListener("mouseout", handleButton);
				button.removeEventListener("click", handleButton);
			});
	}, []);

	return (
		<div className="profile-category-buttons" ref={buttonsRef}>
			<div className="btns">
				<button className="active" data-position="0" onClick={e => true}>
					Videos
				</button>
				<button data-position="1">Liked</button>
			</div>
			<div className="button-underbar">
				<span style={{ left: "0%" }} />
			</div>
		</div>
	);
}
