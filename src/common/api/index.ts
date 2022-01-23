import axios from "axios";

export const baseURL = process.env.SERVER_URL || "http://localhost:5000";
const timeout = 10000; // 10s

export const apiClient = axios.create({
	baseURL,
	timeout
});

apiClient.interceptors.response.use(undefined, error => {
	let msg: string;
	if (error.response) msg = error.response.data.message;
	else if (error.request) msg = "Network error. Check your connection";
	else msg = "Something went wrong. Try again";

	error.message = msg;
	return Promise.reject(error);
});
