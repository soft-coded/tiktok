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
			"https://v39-eu.tiktokcdn.com/67c569b77da2a2697a8f0ea141f46eb2/6192973e/video/tos/useast2a/tos-useast2a-ve-0068c002/16ec2693dd73454692f17a8cc39c7532/?a=1233&br=2708&bt=1354&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=wZ~R8F8rkag3-I&l=202111151121530101890501594C0982E8&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=ajZwbmk6ZjlvOTMzNzczM0ApPDNmNDk1OjtmN2c0OzY4aWdwMl5gcjRnNDVgLS1kMTZzczRfNTUtMmAvLWEuXi1gNTU6Yw%3D%3D&vl=&vr=",
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
			"https://v39-eu.tiktokcdn.com/67c569b77da2a2697a8f0ea141f46eb2/6192973e/video/tos/useast2a/tos-useast2a-ve-0068c002/16ec2693dd73454692f17a8cc39c7532/?a=1233&br=2708&bt=1354&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=wZ~R8F8rkag3-I&l=202111151121530101890501594C0982E8&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=ajZwbmk6ZjlvOTMzNzczM0ApPDNmNDk1OjtmN2c0OzY4aWdwMl5gcjRnNDVgLS1kMTZzczRfNTUtMmAvLWEuXi1gNTU6Yw%3D%3D&vl=&vr=",
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
