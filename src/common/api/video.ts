import { apiClient } from ".";

const videoURL = "/video";

export const createVideo = (data: FormData) =>
	apiClient.post(videoURL + "/create", data, {
		headers: {
			"Content-Type": "multipart/form-data",
			Accept: "video/mp4"
		}
	});
