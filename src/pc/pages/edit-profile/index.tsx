import { useState, useEffect } from "react";

import "./edit-profile.scss";
import Container from "../../components/container";
import LoadingSpinner from "../../components/loading-spinner";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { UserData } from "../../../common/types";
import { getCustom } from "../../../common/api/user";
import { notificationActions } from "../../store/slices/notification-slice";
import constants from "../../../common/constants";

export default function EditProfile() {
	const dispatch = useAppDispatch();
	const username = useAppSelector(state => state.auth.username!);
	const [userInfo, setUserInfo] = useState<UserData | null>(null);

	useEffect(() => {
		async function fetchUserInfo() {
			try {
				const res = await getCustom(
					{ name: "1", email: "1", description: "1" },
					username
				);
				delete res.data.success;
				setUserInfo(res.data);
			} catch (err: any) {
				dispatch(
					notificationActions.showNotification({
						type: "error",
						message: err.message
					})
				);
			}
		}
		fetchUserInfo();
	}, [username, dispatch]);

	return (
		<Container className="edit-profile-container">
			<div className="card">
				<header>
					<h1>Edit profile</h1>
					<h4>Change your account information</h4>
				</header>
				<div className="card-body">
					{!userInfo ? (
						<LoadingSpinner />
					) : (
						<form>
							<div className="form-group pfp">
								<div className="clickable rounded-photo">
									<img
										src={constants.pfpLink + "/" + username}
										alt={userInfo.name}
									/>
									<input
										id="pfp"
										type="file"
										accept=".png,.PNG,.jpg,.JPG,.JPEG,.jpeg"
									/>
								</div>
								<label htmlFor="pfp" className="clickable edit">
									Change profile photo
								</label>
							</div>
							<div className="form-group">
								<label htmlFor="name">Name</label>
								<p>{userInfo.name}</p>
								<span className="clickable edit">Edit</span>
							</div>
							<div className="form-group">
								<label htmlFor="email">Email</label>
								<p>{userInfo.email}</p>
								<span className="clickable edit">Edit</span>
							</div>
							<div className="form-group">
								<label htmlFor="description">Bio</label>
								<p>{userInfo.description}</p>
								<span className="clickable edit">Edit</span>
							</div>
							<div className="form-group">
								<label htmlFor="password">Password</label>
								<p />
								<span className="clickable edit">Change password</span>
							</div>
							<div className="buttons">
								<button type="submit" className="primary-button" disabled>
									Save
								</button>
								<button className="info-button">Cancel</button>
							</div>
						</form>
					)}
				</div>
			</div>
		</Container>
	);
}
