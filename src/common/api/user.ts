import { apiClient } from ".";
import { UserQuery } from "../types";

const userURL = "/user";

const shortParams: UserQuery = {
	name: "1",
	description: "1",
	followers: "num",
	totalLikes: "1"
};
export const getShortUser = (username: string, loggedInAs?: string | null) =>
	apiClient.get(userURL + "/" + username, {
		params: { ...shortParams, loggedInAs }
	});

const params: UserQuery = {
	...shortParams,
	following: "num",
	videos: "uploaded"
};
export const getUser = (username: string, loggedInAs?: string | null) =>
	apiClient.get(userURL + "/" + username, {
		params: { ...params, loggedInAs }
	});

export const getCustom = (params: UserQuery, username: string) =>
	apiClient.get(userURL + "/" + username, { params });

export const getLikedVideos = (username: string) =>
	apiClient.get(userURL + "/" + username, { params: { videos: "liked" } });

export const followUser = (toFollow: string, loggedInAs: string | null) =>
	apiClient.post(userURL + "/follow", { toFollow, loggedInAs });

export const updateUser = (username: string, data: any) =>
	apiClient.patch(userURL + "/" + username, data);

const notifRoute = "/notifications";

export const hasNewNotifs = (username: string, token: string) =>
	apiClient.post(userURL + notifRoute + "/hasNew", { username, token });

export const readAllNotifs = (username: string, token: string) =>
	apiClient.post(userURL + notifRoute + "/readAll", { username, token });
