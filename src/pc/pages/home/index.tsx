import classes from "./home.module.scss";
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
			"https://v16m.tiktokcdn.com/9d299216823de71ee960f8519615d90c/618eb088/video/tos/alisg/tos-alisg-pve-0037c001/4191de1db2584bf4b0d32c1937fed924/?a=1233&br=2426&bt=1213&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=wZ~A5FLbkag3-I&l=202111121220440101890491561905E65C&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=ajhwazY6ZmQ7OTMzODczNEApNjlkOGY5Nzs0Nzc8NzRnPGdpLV8ucjQwbzBgLS1kMS1zc15jX2AwLl9gLzNgNWE1NV46Yw%3D%3D&vl=&vr=",
		likesNum: "3.9M",
		commentsNum: "45K",
		sharesNum: "88K"
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
			"https://v39-eu.tiktokcdn.com/19131d0361a670f02bb14bd2856ac652/618ee866/video/tos/useast2a/tos-useast2a-pve-0068/3aa29402cedd4191b5a94a58a8e6afc1/?a=1233&br=3544&bt=1772&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=wZ~RNFl6kag3-I&l=2021111216190601018903602359197F01&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=andydDg6ZjRpODMzNzczM0ApZmY1Mzk8OmU2N2k6aDY0OWdxNTNocjRvYjNgLS1kMTZzcy8uYl4uYmMwNi5iXy42MWM6Yw%3D%3D&vl=&vr=",
		likesNum: "3.9M",
		commentsNum: "45K",
		sharesNum: "88K"
	}
];

export default function Home() {
	return (
		<Container className={classes["home-container"]}>
			<Sidebar />
			<div className={classes["cards-container"]}>
				{posts.map(post => (
					<VideoCard {...post} key={post.userId} />
				))}
			</div>
		</Container>
	);
}
