import "./home.scss";
import Container from "../../components/container";
import Sidebar from "../../components/sidebar";
import VideoCard from "../../components/video-card";

export const posts = [
	{
		profilePhoto:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Narendra_Modi_2021.jpg/1200px-Narendra_Modi_2021.jpg",
		name: "Narendra Modi",
		username: "narendramodi",
		caption: "Welcome to India. Hope you enjoy your stay. 😊😂❤️😒😘",
		music: "Rabindranath Tagore - 🏁Jana Gana Mana🏁",
		video:
			"https://v58.tiktokcdn.com/video/tos/alisg/tos-alisg-pve-0037c001/b5ff446797284e78ba9e8d45994cc108/?VExpiration=1637372208&VSignature=AgVlXcH5ooCh1845my0VOQ&a=1233&br=2186&bt=1093&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=wZ~A5FLbkag3-I&l=20211119193636010223120042184A60EF&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=M3h0ajU6Zm4zODMzODczNEApZTY0Zjw1ZTtmNzlmNDQ7aGdtcmMtcjRfZTBgLS1kMS1zc2M1Xl4tXl9iYjI2Ly80NGI6Yw%3D%3D&vl=&vr=",
		likesNum: "3.9M",
		commentsNum: "45K",
		sharesNum: "88K",
		uploadTime: "12h ago"
	},
	{
		profilePhoto:
			"https://c.ndtvimg.com/2021-10/anbbap0g_amit-shah-at-nhrc-event-pti_625x300_12_October_21.jpg",
		name: "Amit Shah",
		username: "amitshah",
		caption:
			"Certified freak, seven days a week. Wet ass pussy, make that pullout game weak. 😘😘😘😘❤️💕",
		music: "Cardi B - WAP",
		video:
			"https://v58.tiktokcdn.com/video/tos/alisg/tos-alisg-pve-0037c001/b5ff446797284e78ba9e8d45994cc108/?VExpiration=1637372208&VSignature=AgVlXcH5ooCh1845my0VOQ&a=1233&br=2186&bt=1093&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=wZ~A5FLbkag3-I&l=20211119193636010223120042184A60EF&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=M3h0ajU6Zm4zODMzODczNEApZTY0Zjw1ZTtmNzlmNDQ7aGdtcmMtcjRfZTBgLS1kMS1zc2M1Xl4tXl9iYjI2Ly80NGI6Yw%3D%3D&vl=&vr=",
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
				{posts.map((post, i) => (
					<VideoCard key={i} {...post} />
				))}
			</div>
		</Container>
	);
}
