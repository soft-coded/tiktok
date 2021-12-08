import { apiClient } from ".";
import { VideoQuery } from "../types";

const videoURL = "/video";

export const createVideo = (data: FormData) =>
	apiClient.post(videoURL + "/create", data, {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	});

const params: VideoQuery = {
	uploader: "1",
	caption: "1",
	music: "1",
	shares: "1",
	views: "1",
	createdAt: "1",
	likes: "1",
	tags: "1",
	comments: "num"
};
export const getVideo = (id: string, username?: string | null) =>
	apiClient.get(videoURL + "/" + id, { params: { ...params, username } });

export const getVidComments = (id: string) =>
	apiClient.get(videoURL + "/" + id, { params: { comments: "list" } });

export const likeVideo = (username: string, id: string) =>
	apiClient.post(videoURL + "/like", { username, videoId: id });

export const postComment = (
	username: string,
	comment: string,
	videoId: string
) => apiClient.post(videoURL + "/comment", { username, comment, videoId });

export const getCustom = (id: string, p: VideoQuery) =>
	apiClient.get(videoURL + "/" + id, { params: p });
