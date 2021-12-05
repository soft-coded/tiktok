import { apiClient } from ".";

const feedURL = "/feed";

export const getFeed = () => apiClient.get(feedURL);
