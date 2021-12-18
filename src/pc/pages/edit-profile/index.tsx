import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

import "./edit-profile.scss";
import Container from "../../components/container";
import Input from "../../components/input-field";
import LoadingSpinner from "../../components/loading-spinner";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { UserData } from "../../../common/types";
import { getCustom, updateUser } from "../../../common/api/user";
import { notificationActions } from "../../store/slices/notification-slice";
import constants from "../../../common/constants";

const validationSchema = yup.object().shape({
	name: yup
		.string()
		.required("Cannot be empty")
		.max(constants.nameMaxLen, `At most ${constants.nameMaxLen} characters`),
	email: yup.string().required("Cannot be empty").email("Invalid email"),
	description: yup
		.string()
		.required("Cannot be empty")
		.max(
			constants.descriptionMaxLen,
			`At most ${constants.descriptionMaxLen} characters`
		),
	oldPassword: yup
		.string()
		.min(
			constants.passwordMinLen,
			`At least ${constants.passwordMinLen} characters`
		),
	newPassword: yup
		.string()
		.min(
			constants.passwordMinLen,
			`At least ${constants.passwordMinLen} characters`
		)
});

export default function EditProfile() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { username, token } = useAppSelector(state => state.auth);
	const [isLoading, setIsLoading] = useState(false);
	const [userInfo, setUserInfo] = useState<UserData | null>(null);
	const [pfp, setPfp] = useState<File>();
	const [showInputs, setShowInputs] = useState({
		name: false,
		email: false,
		description: false,
		passwords: false
	});
	const pfpURL = useMemo(
		() => (pfp ? URL.createObjectURL(pfp) : undefined),
		[pfp]
	);
	const formik = useFormik({
		initialValues: {
			name: userInfo?.name,
			email: userInfo?.email,
			description: userInfo?.description,
			oldPassword: "",
			newPassword: ""
		},
		enableReinitialize: true,
		validationSchema,
		onSubmit: async values => {
			try {
				setIsLoading(true);
				const formData = new FormData();
				formData.append("token", token!);

				if (values.name !== userInfo!.name)
					formData.append("name", values.name!);
				if (values.email !== userInfo!.email)
					formData.append("email", values.email!);
				if (values.description !== userInfo!.description)
					formData.append("description", values.description!);
				if (values.oldPassword || values.newPassword) {
					formData.append("oldPassword", values.oldPassword);
					formData.append("newPassword", values.newPassword);
				}

				if (pfp) {
					if (!constants.pfpRegex.test(pfp.type))
						throw new Error("Only JPG and PNG files allowed");
					if (pfp.size > constants.pfpSizeLimit)
						throw new Error("Profile photo should be less than 2 MB");

					formData.append("changePfp", "update");
					// keep the photo last or the backend will not receive the correct data
					formData.append("profilePhoto", pfp);
				}

				await updateUser(username!, formData);
				dispatch(
					notificationActions.showNotification({
						type: "success",
						message: "Profile updated"
					})
				);
				setIsLoading(false);
				// !!!page needs to refresh, do not use navigate here!!!
				window.location.replace("/user/" + username);
			} catch (err: any) {
				dispatch(
					notificationActions.showNotification({
						type: "error",
						message: err.message
					})
				);
				setIsLoading(false);
			}
		}
	});

	useEffect(() => {
		async function fetchUserInfo() {
			try {
				const res = await getCustom(
					{ name: "1", email: "1", description: "1" },
					username!
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

	const handleShowInputs = useCallback((input: string) => {
		setShowInputs(prev => ({ ...prev, [input]: true }));
	}, []);

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
						<form onSubmit={formik.handleSubmit}>
							<div className="form-group pfp">
								<label htmlFor="pfp">
									<div className="clickable rounded-photo">
										{pfp ? (
											<img src={pfpURL} alt="user" />
										) : (
											<img
												src={constants.pfpLink + "/" + username}
												alt={userInfo.name}
											/>
										)}
										<input
											id="pfp"
											type="file"
											accept=".png,.PNG,.jpg,.JPG,.JPEG,.jpeg"
											onChange={e => setPfp(e.target.files?.[0])}
										/>
									</div>
								</label>
								{pfp ? (
									<span
										className="clickable edit"
										onClick={() => setPfp(undefined)}
									>
										Remove photo
									</span>
								) : (
									<label htmlFor="pfp" className="clickable edit">
										Change profile photo
									</label>
								)}
							</div>
							<div className="form-group">
								<label htmlFor="name">Name</label>
								<div className="data">
									{showInputs.name ? (
										<>
											<Input
												name="name"
												value={formik.values.name}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												error={formik.touched.name && formik.errors.name}
											/>
										</>
									) : (
										<>
											<p>{userInfo.name}</p>
											<span
												className="clickable edit"
												onClick={() => handleShowInputs("name")}
											>
												Edit
											</span>
										</>
									)}
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="email">Email</label>
								<div className="data">
									{showInputs.email ? (
										<Input
											name="email"
											value={formik.values.email}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											error={formik.touched.email && formik.errors.email}
										/>
									) : (
										<>
											<p>{userInfo.email}</p>
											<span
												className="clickable edit"
												onClick={() => handleShowInputs("email")}
											>
												Edit
											</span>
										</>
									)}
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="description">Bio</label>
								<div className="data">
									{showInputs.description ? (
										<Input
											autoComplete="off"
											name="description"
											value={formik.values.description}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											error={
												formik.touched.description && formik.errors.description
											}
										/>
									) : (
										<>
											<p className="break-word">{userInfo.description}</p>
											<span
												className="clickable edit"
												onClick={() => handleShowInputs("description")}
											>
												Edit
											</span>
										</>
									)}
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="password">Password</label>
								<div className="data passwords">
									{showInputs.passwords ? (
										<>
											<Input
												type="password"
												name="oldPassword"
												placeholder="Old password"
												value={formik.values.oldPassword}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												error={
													formik.touched.oldPassword &&
													formik.errors.oldPassword
												}
											/>
											<Input
												type="password"
												name="newPassword"
												placeholder="New password"
												value={formik.values.newPassword}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												error={
													formik.touched.newPassword &&
													formik.errors.newPassword
												}
											/>
										</>
									) : (
										<span
											className="clickable edit"
											onClick={() => handleShowInputs("passwords")}
										>
											Change password
										</span>
									)}
								</div>
							</div>
							<div className="buttons">
								<button
									type="submit"
									className="primary-button"
									disabled={
										((!formik.dirty || !formik.isValid) && !pfp) || isLoading
									}
								>
									{isLoading ? (
										<LoadingSpinner className="save-spinner" />
									) : (
										"Post"
									)}
								</button>
								<button
									type="button"
									className="info-button"
									onClick={() => navigate(-1)}
								>
									Cancel
								</button>
							</div>
						</form>
					)}
				</div>
			</div>
		</Container>
	);
}
