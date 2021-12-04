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
	videos?: {
		uploaded?: VideoData[];
		liked?: VideoData[];
	};
}

export interface VideoData extends CommonData {
	videoId?: string;
	uploader?: UserData;
	caption?: string;
	music?: string;
	video?: string;
	tags?: string[];
	likes?: number | string[];
	comments?: number | CommentData[];
	shares?: number;
	views?: number;
}

export interface CommentData extends CommonData {
	postedBy?: UserData;
	comment?: string;
	likes?: number | any[];
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
