import { apiClient } from ".";
import { UserQuery } from "../types";

const userURL = "/user";

const shortParams: UserQuery = {
	description: "1",
	followers: "num",
	following: "num",
	totalLikes: "1"
};

export const getShortUser = (username: string) =>
	apiClient.get(userURL + "/" + username, { params: shortParams });
