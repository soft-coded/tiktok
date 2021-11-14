import "./home.scss";
import Container from "../../components/container";
import Sidebar from "../../components/sidebar";
import VideoCard from "../../components/video-card";

const posts = [
	{
		userId: "1",
		profilePhoto:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Narendra_Modi_2021.jpg/1200px-Narendra_Modi_2021.jpg",
		name: "Narendra Modi",
		username: "narendramodi",
		caption: "Welcome to India. Hope you enjoy your stay. 😊😂❤️😒😘",
		music: "Rabindranath Tagore - 🏁Jana Gana Mana🏁",
		video:
			"https://v39-us.tiktokcdn.com/0d76007ad8643dedae27bd49a993f7f0/6191682d/video/tos/useast5/tos-useast5-ve-0068c001-tx/74ff18fbd6fb487f9f7e4e2c6e5157f9/?a=1233&br=1136&bt=568&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=wZ~ROFGgkag3-I&l=2021111413485201018904922518DFDABE&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=M3VyaTs6ZnduOTMzZzczNEApNWZlZWY1MzxpNztlOWlnOGdicDFucjRnNDJgLS1kMS9zczBeNS80YTQvMDQzY15hL2E6Yw%3D%3D&vl=&vr=",
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
			"https://v39-us.tiktokcdn.com/0d76007ad8643dedae27bd49a993f7f0/6191682d/video/tos/useast5/tos-useast5-ve-0068c001-tx/74ff18fbd6fb487f9f7e4e2c6e5157f9/?a=1233&br=1136&bt=568&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=wZ~ROFGgkag3-I&l=2021111413485201018904922518DFDABE&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=M3VyaTs6ZnduOTMzZzczNEApNWZlZWY1MzxpNztlOWlnOGdicDFucjRnNDJgLS1kMS9zczBeNS80YTQvMDQzY15hL2E6Yw%3D%3D&vl=&vr=",
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
