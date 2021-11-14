// import { useParams } from "react-router-dom";

import "./profile.scss";
import Container from "../../components/container";
import Sidebar, { suggestedAccounts } from "../../components/sidebar";

const user = {
	userId: "1",
	profilePhoto:
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Narendra_Modi_2021.jpg/1200px-Narendra_Modi_2021.jpg",
	name: "Narendra Modi",
	username: "narendramodi",
	followingNum: "102",
	followersNum: "20M",
	totalLikes: "50M",
	description:
		"The absolute throat goat and I mean that shit. No one can come close to me when it comes to gulping down a fat one. Oh, and also the PM of India or whatever who cares lol bye",
	videos: [
		"https://v39-us.tiktokcdn.com/0d76007ad8643dedae27bd49a993f7f0/6191682d/video/tos/useast5/tos-useast5-ve-0068c001-tx/74ff18fbd6fb487f9f7e4e2c6e5157f9/?a=1233&br=1136&bt=568&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=wZ~ROFGgkag3-I&l=2021111413485201018904922518DFDABE&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=M3VyaTs6ZnduOTMzZzczNEApNWZlZWY1MzxpNztlOWlnOGdicDFucjRnNDJgLS1kMS9zczBeNS80YTQvMDQzY15hL2E6Yw%3D%3D&vl=&vr=",
		"https://v39-us.tiktokcdn.com/0d76007ad8643dedae27bd49a993f7f0/6191682d/video/tos/useast5/tos-useast5-ve-0068c001-tx/74ff18fbd6fb487f9f7e4e2c6e5157f9/?a=1233&br=1136&bt=568&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=wZ~ROFGgkag3-I&l=2021111413485201018904922518DFDABE&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=M3VyaTs6ZnduOTMzZzczNEApNWZlZWY1MzxpNztlOWlnOGdicDFucjRnNDJgLS1kMS9zczBeNS80YTQvMDQzY15hL2E6Yw%3D%3D&vl=&vr=",
		"https://v39-us.tiktokcdn.com/0d76007ad8643dedae27bd49a993f7f0/6191682d/video/tos/useast5/tos-useast5-ve-0068c001-tx/74ff18fbd6fb487f9f7e4e2c6e5157f9/?a=1233&br=1136&bt=568&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=wZ~ROFGgkag3-I&l=2021111413485201018904922518DFDABE&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=M3VyaTs6ZnduOTMzZzczNEApNWZlZWY1MzxpNztlOWlnOGdicDFucjRnNDJgLS1kMS9zczBeNS80YTQvMDQzY15hL2E6Yw%3D%3D&vl=&vr=",
		"https://v39-us.tiktokcdn.com/0d76007ad8643dedae27bd49a993f7f0/6191682d/video/tos/useast5/tos-useast5-ve-0068c001-tx/74ff18fbd6fb487f9f7e4e2c6e5157f9/?a=1233&br=1136&bt=568&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=wZ~ROFGgkag3-I&l=2021111413485201018904922518DFDABE&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=M3VyaTs6ZnduOTMzZzczNEApNWZlZWY1MzxpNztlOWlnOGdicDFucjRnNDJgLS1kMS9zczBeNS80YTQvMDQzY15hL2E6Yw%3D%3D&vl=&vr=",
		"https://v39-us.tiktokcdn.com/0d76007ad8643dedae27bd49a993f7f0/6191682d/video/tos/useast5/tos-useast5-ve-0068c001-tx/74ff18fbd6fb487f9f7e4e2c6e5157f9/?a=1233&br=1136&bt=568&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=wZ~ROFGgkag3-I&l=2021111413485201018904922518DFDABE&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=M3VyaTs6ZnduOTMzZzczNEApNWZlZWY1MzxpNztlOWlnOGdicDFucjRnNDJgLS1kMS9zczBeNS80YTQvMDQzY15hL2E6Yw%3D%3D&vl=&vr="
	]
};

export default function Profile() {
	// const {username} = useParams();
	console.log("here");

	return (
		<Container className="profile-page-container">
			<Sidebar />
			<div className="profile-container">
				<header>
					<div className="rounded-photo">
						<img src={user.profilePhoto} alt={user.name} />
					</div>
					<div className="names">
						<h1>{user.username}</h1>
						<h4>{user.name}</h4>
						<button className="primary-button">Follow</button>
					</div>
				</header>
				<div className="user-details">
					<div className="counts">
						<p>
							<h4>{user.followingNum}</h4> Following
						</p>
						<p>
							<h4>{user.followersNum}</h4> Followers
						</p>
						<p>
							<h4>{user.totalLikes}</h4> Likes
						</p>
					</div>
					<p className="description">{user.description}</p>
				</div>
				<div className="suggested">
					<h5>
						<span>Suggested accounts</span>
						<span className="see-all">See all</span>
					</h5>
					<div className="account-buttons">
						{suggestedAccounts.slice(0, 3).map((acc, i) => (
							<div key={i} className="acc-btn">
								<div className="rounded-photo">
									<img src={acc.photo} alt={acc.name} />
								</div>
								<h4>{acc.username}</h4>
							</div>
						))}
					</div>
				</div>
			</div>
		</Container>
	);
}
