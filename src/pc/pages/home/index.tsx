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
			"https://v77.tiktokcdn.com/1562e2d25d6c4e73d02c11c4ab9f1a9a/61910b2a/video/tos/useast2a/tos-useast2a-pve-0037-aiso/548f08d94664485190c0baeaf5850473/?a=1180&br=1066&bt=533&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=3&ds=3&er=&ft=wZ~RfFhRkag3-I&l=2021111407113901018806122705C127A1&lr=tiktok&mime_type=video_mp4&net=0&pl=0&qs=0&rc=anllOjM6ZnZuODMzZjgzM0ApZDU8NzdpNTxmN2ZnPDY0NWdyanJocjRfazBgLS1kL2Nzc2I1XjVgNi1gNjU0LzM1LWI6Yw%3D%3D&vl=&vr=",
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
			"https://v77.tiktokcdn.com/1562e2d25d6c4e73d02c11c4ab9f1a9a/61910b2a/video/tos/useast2a/tos-useast2a-pve-0037-aiso/548f08d94664485190c0baeaf5850473/?a=1180&br=1066&bt=533&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=3&ds=3&er=&ft=wZ~RfFhRkag3-I&l=2021111407113901018806122705C127A1&lr=tiktok&mime_type=video_mp4&net=0&pl=0&qs=0&rc=anllOjM6ZnZuODMzZjgzM0ApZDU8NzdpNTxmN2ZnPDY0NWdyanJocjRfazBgLS1kL2Nzc2I1XjVgNi1gNjU0LzM1LWI6Yw%3D%3D&vl=&vr=",
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
			<div className="cards-container">
				{posts.map(post => (
					<VideoCard key={post.userId} {...post} />
				))}
			</div>
		</Container>
	);
}
