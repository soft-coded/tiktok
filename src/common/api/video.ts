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

export const getCustom = (id: string, p: VideoQuery) =>
	apiClient.get(videoURL + "/" + id, { params: p });

export const getVidComments = (id: string, username?: string | null) =>
	apiClient.get(videoURL + "/" + id, {
		params: { comments: "list", username }
	});

export const deleteVideo = (id: string, username: string, token: string) =>
	apiClient.delete(videoURL + "/" + id, {
		data: { username, token }
	});

export const likeVideo = (username: string, id: string) =>
	apiClient.post(videoURL + "/like", { username, videoId: id });

export const postComment = (
	username: string,
	comment: string,
	videoId: string
) => apiClient.post(videoURL + "/comment", { username, comment, videoId });

export const likeComment = (
	videoId: string,
	commentId: string,
	username: string
) =>
	apiClient.post(videoURL + "/likeComment", { videoId, commentId, username });

export const deleteComment = (
	commentId: string,
	videoId: string,
	username: string,
	token: string
) =>
	apiClient.delete(videoURL + "/comment", {
		data: { commentId, videoId, username, token }
	});

export const reply = (
	comment: string,
	commentId: string,
	videoId: string,
	username: string
) =>
	apiClient.post(videoURL + "/reply", {
		comment,
		commentId,
		videoId,
		username
	});

export const deleteReply = (
	videoId: string,
	commentId: string,
	replyId: string,
	username: string,
	token: string
) =>
	apiClient.delete(videoURL + "/reply", {
		data: { videoId, commentId, replyId, username, token }
	});

export const getReplies = (
	videoId: string,
	commentId: string,
	username?: string | null
) =>
	apiClient.get(videoURL + "/getReplies", {
		params: { videoId, commentId, username }
	});

export const likeReply = (
	videoId: string,
	commentId: string,
	replyId: string,
	username: string
) =>
	apiClient.post(videoURL + "/likeReply", {
		videoId,
		commentId,
		replyId,
		username
	});
