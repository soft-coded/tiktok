import "./home.scss";
import Container from "../../components/container";
import Sidebar from "../../components/sidebar";
import VideoCard from "../../components/video-card";

export const posts = [
	{
		userId: "1",
		profilePhoto:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Narendra_Modi_2021.jpg/1200px-Narendra_Modi_2021.jpg",
		name: "Narendra Modi",
		username: "narendramodi",
		caption: "Welcome to India. Hope you enjoy your stay. 😊😂❤️😒😘",
		music: "Rabindranath Tagore - 🏁Jana Gana Mana🏁",
		video:
			"https://v16m.tiktokcdn.com/2285f99a5ac406410057713251d123a8/6195a1e5/video/tos/alisg/tos-alisg-pve-0037c001/2dae7eda105a44c7a8be7204f1b3f22e/?a=1233&br=5350&bt=2675&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=wZ~A5FLbkag3-I&l=202111171844120101910471404F17B001&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=anI8djg6ZmZ2OTMzODczNEApZzdpZzZlOTw0NzVkZzY1Z2djZTEwcjQwbzZgLS1kMS1zczMwNTRjYV5hYjBeLjNiYjA6Yw%3D%3D&vl=&vr=",
		likesNum: "3.9M",
		commentsNum: "45K",
		sharesNum: "88K",
		uploadTime: "12h ago"
	},
	{
		userId: "2",
		profilePhoto:
			"https://c.ndtvimg.com/2021-10/anbbap0g_amit-shah-at-nhrc-event-pti_625x300_12_October_21.jpg",
		name: "Amit Shah",
		username: "amitshah",
		caption:
			"Certified freak, seven days a week. Wet ass pussy, make that pullout game weak. 😘😘😘😘❤️💕",
		music: "Cardi B - WAP",
		video:
			"https://v16m.tiktokcdn.com/2285f99a5ac406410057713251d123a8/6195a1e5/video/tos/alisg/tos-alisg-pve-0037c001/2dae7eda105a44c7a8be7204f1b3f22e/?a=1233&br=5350&bt=2675&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=wZ~A5FLbkag3-I&l=202111171844120101910471404F17B001&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=anI8djg6ZmZ2OTMzODczNEApZzdpZzZlOTw0NzVkZzY1Z2djZTEwcjQwbzZgLS1kMS1zczMwNTRjYV5hYjBeLjNiYjA6Yw%3D%3D&vl=&vr=",
		likesNum: "3.9M",
		commentsNum: "45K",
		sharesNum: "88K",
		uploadTime: "12h ago"
	}
];

export default function Home() {
	return (
		<Container className="homepage-container">
			<Sidebar />
			<div className="content-container">
				{posts.map(post => (
					<VideoCard key={post.userId} {...post} />
				))}
			</div>
		</Container>
	);
}
