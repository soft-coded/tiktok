import { apiClient } from ".";

const feedURL = "/feed";

export const getFeed = (username?: string | null, skip?: number) =>
	apiClient.get(feedURL, { params: { username, skip } });

export const getSuggested = (limit?: number) =>
	apiClient.get(feedURL + "/suggested", { params: { limit } });

export const getFollowingVids = (username: string, skip?: number) =>
	apiClient.get(feedURL + "/following", { params: { username, skip } });

export const search = (query: string, send: "accounts" | "videos") =>
	apiClient.post(feedURL + "/search", { query, send });
