import axios from "axios";

export const baseURL = "http://localhost:5000";
const timeout = 5000; // 5s

export const apiClient = axios.create({
	baseURL,
	timeout
});

apiClient.interceptors.response.use(undefined, error => {
	error.message = error.response
		? error.response.data.message
		: error.request
		? error.message
		: "Something went wrong. Try again.";

	return Promise.reject(error);
});
