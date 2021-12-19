import { apiClient } from ".";

const feedURL = "/feed";

export const getFeed = (username?: string | null) =>
	apiClient.get(feedURL, { params: { username } });

export const getSuggested = (limit?: number) =>
	apiClient.get(feedURL + "/suggested", { params: { limit } });

export const getFollowingVids = (username: string) =>
	apiClient.get(feedURL + "/following", { params: { username } });
