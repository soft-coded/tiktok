import { useReducer } from "react";

import { VideoDynamics } from "../../../common/types";

export const videoDynamicsActions = {
	LIKED: "liked",
	FOLLOWED: "followed",
	COMMENTED: "commented",
	ALL: "all"
};

type ActionType = {
	type: string;
	hasLiked?: boolean;
	isFollowing?: boolean;
	commentsNum?: number;
	payload?: VideoDynamics;
};

function videoDynamicsReducer(
	state: VideoDynamics,
	action: ActionType
): VideoDynamics {
	switch (action.type) {
		case videoDynamicsActions.LIKED:
			return {
				...state,
				hasLiked: action.hasLiked!,
				likesNum: state.likesNum + (action.hasLiked ? 1 : -1)
			};

		case videoDynamicsActions.FOLLOWED:
			return {
				...state,
				isFollowing: action.isFollowing
			};

		case videoDynamicsActions.COMMENTED:
			return {
				...state,
				commentsNum: action.commentsNum!
			};

		case videoDynamicsActions.ALL:
			return { ...action.payload! };

		default:
			return state;
	}
}

export default function useVideoDynamics(initState: VideoDynamics) {
	return useReducer(videoDynamicsReducer, initState);
}
