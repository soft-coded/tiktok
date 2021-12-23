import { apiClient } from ".";

const feedURL = "/feed";

export const getFeed = (username?: string | null) =>
	apiClient.get(feedURL, { params: { username } });

export const getSuggested = (limit?: number) =>
	apiClient.get(feedURL + "/suggested", { params: { limit } });

export const getFollowingVids = (username: string) =>
	apiClient.get(feedURL + "/following", { params: { username } });

export const search = (query: string, send: "accounts" | "videos") =>
	apiClient.post(feedURL + "/search", { query, send });
