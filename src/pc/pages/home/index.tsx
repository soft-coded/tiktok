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
			"https://v19.tiktokcdn.com/0a943c190046c710dbfe6b8ff8389b30/619314cd/video/tos/useast2a/tos-useast2a-pve-0068/3fbabf74e7c4437a8218aacb95ff4f44/?a=1233&br=5264&bt=2632&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=wZ~AOFFnkag3-I&l=202111152017270101890660323538583C&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=Mzs6ZjQ6ZjtnOTMzNzczM0ApO2Y4aWRmaDs1N2hkNDw3Z2dfZF5lcjQwMTRgLS1kMTZzcy1fLy0yXmE2Mi1gYi40M146Yw%3D%3D&vl=&vr=",
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
			"https://v19.tiktokcdn.com/0a943c190046c710dbfe6b8ff8389b30/619314cd/video/tos/useast2a/tos-useast2a-pve-0068/3fbabf74e7c4437a8218aacb95ff4f44/?a=1233&br=5264&bt=2632&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=wZ~AOFFnkag3-I&l=202111152017270101890660323538583C&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=Mzs6ZjQ6ZjtnOTMzNzczM0ApO2Y4aWRmaDs1N2hkNDw3Z2dfZF5lcjQwMTRgLS1kMTZzcy1fLy0yXmE2Mi1gYi40M146Yw%3D%3D&vl=&vr=",
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
