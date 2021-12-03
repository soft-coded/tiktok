// import { useParams } from "react-router-dom";

import "./profile.scss";
import Container from "../../components/container";
import Sidebar, { suggestedAccounts } from "../../components/sidebar";
import ProfileButtons from "../../components/profile-buttons";
import ProfileCard from "../../components/profile-card";
import { useAppDispatch } from "../../../common/store";
import { videoModalActions } from "../../store/slices/video-modal-slice";
import { modifyScrollbar } from "../../../common/utils";

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
		"https://v16m.tiktokcdn.com/2285f99a5ac406410057713251d123a8/6195a1e5/video/tos/alisg/tos-alisg-pve-0037c001/2dae7eda105a44c7a8be7204f1b3f22e/?a=1233&br=5350&bt=2675&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=wZ~A5FLbkag3-I&l=202111171844120101910471404F17B001&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=anI8djg6ZmZ2OTMzODczNEApZzdpZzZlOTw0NzVkZzY1Z2djZTEwcjQwbzZgLS1kMS1zczMwNTRjYV5hYjBeLjNiYjA6Yw%3D%3D&vl=&vr=",
		"https://v16m.tiktokcdn.com/2285f99a5ac406410057713251d123a8/6195a1e5/video/tos/alisg/tos-alisg-pve-0037c001/2dae7eda105a44c7a8be7204f1b3f22e/?a=1233&br=5350&bt=2675&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=wZ~A5FLbkag3-I&l=202111171844120101910471404F17B001&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=anI8djg6ZmZ2OTMzODczNEApZzdpZzZlOTw0NzVkZzY1Z2djZTEwcjQwbzZgLS1kMS1zczMwNTRjYV5hYjBeLjNiYjA6Yw%3D%3D&vl=&vr=",
		"https://v16m.tiktokcdn.com/2285f99a5ac406410057713251d123a8/6195a1e5/video/tos/alisg/tos-alisg-pve-0037c001/2dae7eda105a44c7a8be7204f1b3f22e/?a=1233&br=5350&bt=2675&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=wZ~A5FLbkag3-I&l=202111171844120101910471404F17B001&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=anI8djg6ZmZ2OTMzODczNEApZzdpZzZlOTw0NzVkZzY1Z2djZTEwcjQwbzZgLS1kMS1zczMwNTRjYV5hYjBeLjNiYjA6Yw%3D%3D&vl=&vr=",
		"https://v16m.tiktokcdn.com/2285f99a5ac406410057713251d123a8/6195a1e5/video/tos/alisg/tos-alisg-pve-0037c001/2dae7eda105a44c7a8be7204f1b3f22e/?a=1233&br=5350&bt=2675&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=wZ~A5FLbkag3-I&l=202111171844120101910471404F17B001&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=anI8djg6ZmZ2OTMzODczNEApZzdpZzZlOTw0NzVkZzY1Z2djZTEwcjQwbzZgLS1kMS1zczMwNTRjYV5hYjBeLjNiYjA6Yw%3D%3D&vl=&vr=",
		"https://v16m.tiktokcdn.com/2285f99a5ac406410057713251d123a8/6195a1e5/video/tos/alisg/tos-alisg-pve-0037c001/2dae7eda105a44c7a8be7204f1b3f22e/?a=1233&br=5350&bt=2675&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=wZ~A5FLbkag3-I&l=202111171844120101910471404F17B001&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=anI8djg6ZmZ2OTMzODczNEApZzdpZzZlOTw0NzVkZzY1Z2djZTEwcjQwbzZgLS1kMS1zczMwNTRjYV5hYjBeLjNiYjA6Yw%3D%3D&vl=&vr=",
		"https://v16m.tiktokcdn.com/2285f99a5ac406410057713251d123a8/6195a1e5/video/tos/alisg/tos-alisg-pve-0037c001/2dae7eda105a44c7a8be7204f1b3f22e/?a=1233&br=5350&bt=2675&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=wZ~A5FLbkag3-I&l=202111171844120101910471404F17B001&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=anI8djg6ZmZ2OTMzODczNEApZzdpZzZlOTw0NzVkZzY1Z2djZTEwcjQwbzZgLS1kMS1zczMwNTRjYV5hYjBeLjNiYjA6Yw%3D%3D&vl=&vr=",
		"https://v16m.tiktokcdn.com/2285f99a5ac406410057713251d123a8/6195a1e5/video/tos/alisg/tos-alisg-pve-0037c001/2dae7eda105a44c7a8be7204f1b3f22e/?a=1233&br=5350&bt=2675&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=wZ~A5FLbkag3-I&l=202111171844120101910471404F17B001&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=anI8djg6ZmZ2OTMzODczNEApZzdpZzZlOTw0NzVkZzY1Z2djZTEwcjQwbzZgLS1kMS1zczMwNTRjYV5hYjBeLjNiYjA6Yw%3D%3D&vl=&vr="
	],
	caption: "hello",
	likesNum: "11K",
	commentsNum: "11K",
	sharesNum: "11K",
	music: "PAW - Bardi C",
	uploadTime: "20h ago"
};

let videoInd: number;

export default function Profile() {
	// const {username} = useParams();
	const dispatch = useAppDispatch();

	function handleModalOpen(ind: number) {
		modifyScrollbar("hide");
		videoInd = ind;
		dispatch(
			videoModalActions.showModal({ ...user, video: user.videos[videoInd] })
		);
	}

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
							<strong>{user.followingNum}</strong> Following
						</p>
						<p>
							<strong>{user.followersNum}</strong> Followers
						</p>
						<p>
							<strong>{user.totalLikes}</strong> Likes
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
				<ProfileButtons />
				<div className="profile-cards-container">
					{user.videos.map((video, i) => (
						<ProfileCard
							key={i}
							index={i}
							video={video}
							handleModalOpen={handleModalOpen}
						/>
					))}
				</div>
			</div>
		</Container>
	);
}
