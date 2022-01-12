import { baseURL } from "./api";

// eslint-disable-next-line
export default {
	usernameRegex: /^[a-zA-Z0-9_]+$/, // letters, numbers and underscore
	usernameMinLen: 4,
	usernameMaxLen: 15,
	passwordMinLen: 6,
	nameMaxLen: 30,
	descriptionMaxLen: 300,
	videoSizeLimit: 20971520,
	pfpRegex: /jpg|jpeg|png/i,
	pfpSizeLimit: 2097152,
	musicMaxLen: 30,
	captionMaxLen: 150,
	tagsMaxLen: 200,
	commentMaxLen: 300,
	searchQueryMaxLen: 25,
	pfpLink: baseURL + "/user/profilePhoto",
	videoLink: baseURL + "/video/stream",
	mobileWidth: 600 // any screen <= 600px will be considered mobile
};
