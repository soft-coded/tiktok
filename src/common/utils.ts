export interface ComponentProps {
	className?: string;
}

interface CommonData {
	userId: string;
	profilePhoto: string;
	username: string;
	name: string;
}

export interface PostData extends CommonData {
	caption: string;
	music: string;
	video: string;
	likesNum: string;
	commentsNum: string;
	sharesNum: string;
	uploadTime: string;
}

export interface UserData extends CommonData {
	followingNum: string;
	followersNum: string;
	totalLikes: string;
	description: string;
	videos: string[];
}

export function joinClasses(...classes: Array<string | undefined>) {
	let res = "";
	for (let i = 0; i < classes.length - 1; i++) {
		if (classes[i]) res += classes[i] + " ";
	}
	if (classes[classes.length - 1]) res += classes[classes.length - 1];
	return res;
}

export function modifyScrollbar(fn: "hide" | "show") {
	const scrollbarWidth =
		window.innerWidth - document.documentElement.clientWidth;
	const styleObj = document.documentElement.style;
	const header = document.querySelector(".app-header header") as HTMLElement;
	if (fn === "hide") {
		styleObj.overflowY = "hidden";
		styleObj.paddingRight = scrollbarWidth + "px";
		header.style.paddingRight = scrollbarWidth + "px";
	} else {
		styleObj.overflowY = "auto";
		styleObj.paddingRight = "unset";
		header.style.paddingRight = "unset";
	}
}

export function handleClickOutside(
	element: HTMLElement | null,
	cb: () => void
) {
	function listener(event: MouseEvent) {
		if (element == null || element.contains(event.target as Node)) return;
		cb();
	}
	document.addEventListener("click", listener);
	return () => document.removeEventListener("click", listener);
}
