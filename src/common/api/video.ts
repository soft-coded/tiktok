import { apiClient } from ".";

const videoURL = "/video";

export const createVideo = (data: FormData) =>
	apiClient.post(videoURL + "/create", data, {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	});

export const getVideo = (id: string) =>
	apiClient.get(videoURL + id, {
		params: {
			uploader: 1,
			caption: 1,
			music: 1,
			shares: 1,
			views: 1,
			createdAt: 1,
			likes: "num",
			comments: "num"
		}
	});
