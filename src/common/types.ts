export interface ComponentProps {
	className?: string;
}

interface CommonData {
	userId: string;
	profilePhoto: string;
	username: string;
	name: string;
}

export interface PostData extends CommonData {
	caption: string;
	music: string;
	video: string;
	likesNum: string;
	commentsNum: string;
	sharesNum: string;
	uploadTime: string;
}

export interface UserData extends CommonData {
	followingNum: string;
	followersNum: string;
	totalLikes: string;
	description: string;
	videos: string[];
}

export interface CommentData extends CommonData {
	comment: string;
	postedTime: string;
	likesNum: string;
	replies?: CommentData[];
}

export interface LoginData {
	username: string;
	password: string;
}

export interface SignupData {
	email: string;
	username: string;
	name: string;
	password: string;
	confpass: string;
}
