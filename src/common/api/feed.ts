import { apiClient } from ".";

const feedURL = "/feed";

export const getFeed = (username?: string | null) =>
	apiClient.get(feedURL, { params: { username } });

export const getSuggested = () => apiClient.get(feedURL + "/suggested");
