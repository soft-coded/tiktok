import { useEffect, useState, useCallback } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import PageWithNavbar from "../../components/page-with-navbar";
import "./edit-profile.scss";
import { UserData } from "../../../common/types";
import Input from "../../../common/components/input-field";
import FullscreenSpinner from "../../../common/components/fullscreen-spinner";
import { errorNotification } from "../../helpers/error-notification";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { getCustom, updateUser } from "../../../common/api/user";
import constants from "../../../common/constants";
import { joinClasses } from "../../../common/utils";
import { authActions } from "../../../common/store/slices/auth-slice";
import { useMemo } from "react";
import LoadingSpinner from "../../../common/components/loading-spinner";

function usesDarkTheme(): boolean {
	let stored: any = localStorage.getItem("usesDarkTheme");
	if (stored) return JSON.parse(stored);
	return false;
}

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
	const { username, token } = useAppSelector(state => state.auth);
	const [user, setUser] = useState<UserData | null>(null);
	const [darkTheme, setDarkTheme] = useState(usesDarkTheme());
	const [isLoading, setIsLoading] = useState(false);
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
			name: user?.name,
			email: user?.email,
			description: user?.description,
			oldPassword: "",
			newPassword: ""
		},
		enableReinitialize: true,
		validationSchema,
		onSubmit: async values => {
			errorNotification(
				async () => {
					setIsLoading(true);
					const formData = new FormData();
					formData.append("token", token!);

					if (values.name !== user!.name) formData.append("name", values.name!);
					if (values.email !== user!.email)
						formData.append("email", values.email!);
					if (values.description !== user!.description)
						formData.append("description", values.description!);
					if (values.oldPassword || values.newPassword) {
						formData.append("oldPassword", values.oldPassword);
						formData.append("newPassword", values.newPassword);
					}

					if (pfp) {
						if (!constants.pfpRegex.test(pfp.type))
							throw new Error("Only JPG and PNG files allowed");
						if (pfp.size > constants.pfpSizeLimit)
							throw new Error(
								`Profile photo should be less than ${Math.round(
									constants.pfpSizeLimit / 1048576
								)} MB`
							);

						formData.append("changePfp", "update");
						// keep the photo last or the backend will not receive the correct data
						formData.append("profilePhoto", pfp);
					}

					await updateUser(username!, formData);
					// !!!page needs to refresh, do not use navigate here!!!
					window.location.href = "/profile";
				},
				dispatch,
				() => setIsLoading(false)
			);
		}
	});

	useEffect(() => {
		errorNotification(async () => {
			const res = await getCustom(
				{ name: "1", email: "1", description: "1" },
				username!
			);
			delete res.data.success;
			setUser(res.data);
		}, dispatch);
	}, [dispatch, username]);

	const toggleTheme = useCallback(() => {
		const classList = document.documentElement.classList;
		if (darkTheme) {
			classList.remove("dark");
			classList.add("light");
		} else {
			classList.remove("light");
			classList.add("dark");
		}

		localStorage.setItem("usesDarkTheme", JSON.stringify(!darkTheme));
		setDarkTheme(!darkTheme);
	}, [darkTheme]);

	const handleShowInputs = useCallback((input: string) => {
		setShowInputs(prev => ({ ...prev, [input]: true }));
	}, []);

	return (
		<PageWithNavbar containerClassName="edit-profile">
			<header>
				<div />
				<h4>Settings</h4>
				<div>
					{isLoading ? (
						<LoadingSpinner className="spinner" />
					) : (formik.dirty && formik.isValid) || pfp ? (
						<button type="submit" form="update-form">
							<i className="fas fa-save" />
						</button>
					) : null}
				</div>
			</header>
			{!user ? (
				<FullscreenSpinner />
			) : (
				<div className="content">
					<section>
						<h4>ACCOUNT</h4>
						<form
							id="update-form"
							className="section-content"
							onSubmit={formik.handleSubmit}
						>
							<div className="form-group pfp">
								<label htmlFor="pfp-input" className="rounded-photo">
									{pfp ? (
										<img src={pfpURL} alt="user" />
									) : (
										<img
											src={constants.pfpLink + "/" + user.username}
											alt={user.name}
										/>
									)}
								</label>
								{pfp ? (
									<span onClick={() => setPfp(undefined)}>Remove photo</span>
								) : (
									<label htmlFor="pfp-input" className="edit">
										Change profile photo
									</label>
								)}
								<input
									type="file"
									id="pfp-input"
									accept=".png,.PNG,.jpg,.JPG,.JPEG,.jpeg"
									onChange={e => setPfp(e.target.files?.[0])}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="name">Name</label>
								<div className="data">
									{showInputs.name ? (
										<Input
											isMobile
											id="name"
											name="name"
											value={formik.values.name}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											error={formik.touched.name && formik.errors.name}
										/>
									) : (
										<>
											<p className="break-word">{user.name}</p>
											<span onClick={() => handleShowInputs("name")}>Edit</span>
										</>
									)}
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="email">Email</label>
								<div className="data">
									{showInputs.email ? (
										<Input
											isMobile
											id="email"
											name="email"
											value={formik.values.email}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											error={formik.touched.email && formik.errors.email}
										/>
									) : (
										<>
											<p className="break-word">{user.email}</p>
											<span onClick={() => handleShowInputs("email")}>
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
											isMobile
											id="description"
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
											<p className="break-word">{user.description}</p>
											<span onClick={() => handleShowInputs("description")}>
												Edit
											</span>
										</>
									)}
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="oldPassword">Password</label>
								<div className="data passwords">
									{showInputs.passwords ? (
										<>
											<Input
												isMobile
												type="password"
												id="oldPassword"
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
												isMobile
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
										<span onClick={() => handleShowInputs("passwords")}>
											Change password
										</span>
									)}
								</div>
							</div>
						</form>
					</section>
					<section>
						<h4>WEBSITE</h4>
						<div className="section-content">
							<div className="form-group" onClick={toggleTheme}>
								<label>Theme</label>
								<div className="data">
									<p>
										<i
											className={joinClasses(
												"fas",
												darkTheme ? "fa-moon" : "fa-sun"
											)}
										/>
									</p>
								</div>
							</div>
							<div
								className="form-group"
								onClick={() => dispatch(authActions.logout())}
							>
								<label>Logout</label>
								<div className="data">
									<p>
										<i className="fas fa-sign-out-alt" />
									</p>
								</div>
							</div>
						</div>
					</section>
					<div className="made-with">
						<p>Made with ❤️ by Shrutanten</p>
						<a
							href="https://github.com/soft-coded"
							target="_blank"
							rel="noreferrer"
						>
							github: @soft-coded
						</a>
					</div>
				</div>
			)}
		</PageWithNavbar>
	);
}
