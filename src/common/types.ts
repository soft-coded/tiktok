export interface ComponentProps {
	className?: string;
}

interface CommonData {
	createdAt?: Date;
}

export interface UserData extends CommonData {
	username?: string;
	name?: string;
	email?: string;
	description?: string;
	profilePhoto?: string;
	following?: number | UserData[];
	followers?: number | UserData[];
	totalLikes?: number;
	videos?: VideoData[] | string[]; // either uploaded or liked, can't be both
	isFollowing?: boolean;
}

export interface VideoData extends CommonData {
	_id?: string;
	videoId?: string;
	uploader?: UserData;
	caption?: string;
	music?: string;
	video?: string;
	tags?: string[];
	likes?: number;
	comments?: number | CommentData[];
	shares?: number;
	views?: number;
	hasLiked?: boolean;
	isFollowing?: boolean;
}

export interface CommentData extends CommonData {
	_id?: string;
	commentId?: string;
	replyId?: string;
	postedBy?: UserData;
	comment?: string;
	likes?: number;
	replies?: number | CommentData[];
	hasLiked?: boolean;
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

export interface VideoQuery {
	username?: string;
	uploader?: "1";
	caption?: "1";
	music?: "1";
	tags?: "1";
	shares?: "1";
	views?: "1";
	createdAt?: "1";
	likes?: "1";
	comments?: "num" | "list";
}

export interface UserQuery {
	name?: "1";
	email?: "1";
	description?: "1";
	totalLikes?: "1";
	createdAt?: "1";
	following?: "list" | "num";
	followers?: "list" | "num";
	videos?: "uploaded" | "liked";
	loggedInAs?: string;
}

export interface VideoDynamics {
	hasLiked: boolean;
	likesNum: number;
	commentsNum: number;
	isFollowing: boolean | undefined;
}
