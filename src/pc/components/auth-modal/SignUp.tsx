import { useFormik } from "formik";
import * as yup from "yup";

import { FormProps } from ".";
import Input from "../input-field";
import LoadingSpinner from "../loading-spinner";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { signupThunk } from "../../../common/store/slices/auth";
import { notificationActions } from "../../store/slices/notification-slice";
import constants from "../../../common/constants";

const validationSchema = yup.object().shape({
	email: yup.string().trim().required("Required").email("Invalid email"),
	username: yup
		.string()
		.trim()
		.required("Required")
		.min(
			constants.usernameMinLen,
			`At least ${constants.usernameMinLen} characters`
		)
		.max(
			constants.usernameMaxLen,
			`At most ${constants.usernameMaxLen} characters`
		)
		.matches(
			constants.usernameRegex,
			"Only English letters, digits and underscores allowed."
		),
	name: yup
		.string()
		.trim()
		.required("Required")
		.max(constants.nameMaxLen, `At most ${constants.nameMaxLen} characters`),
	password: yup
		.string()
		.trim()
		.required("Required")
		.min(
			constants.passwordMinLen,
			`At least ${constants.passwordMinLen} characters`
		),
	confpass: yup
		.string()
		.trim()
		.required("Required")
		.oneOf([yup.ref("password"), null], "Passwords do not match")
});

export default function SignUp({ setAuthType, handleModalClose }: FormProps) {
	const dispatch = useAppDispatch();
	const authStatus = useAppSelector(state => state.auth.status);

	const formik = useFormik({
		initialValues: {
			email: "",
			username: "",
			name: "",
			password: "",
			confpass: ""
		},
		validationSchema,
		onSubmit: async values => {
			try {
				await dispatch(signupThunk(values)).unwrap();
				handleModalClose();
			} catch (err: any) {
				dispatch(
					notificationActions.showNotification({
						type: "error",
						message: err.message
					})
				);
			}
		}
	});

	return (
		<>
			<h1>Sign up</h1>
			<form onSubmit={formik.handleSubmit}>
				<h3>Sign up via username</h3>
				<Input
					placeholder="Username"
					name="username"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.username && formik.errors.username}
				/>
				<Input
					placeholder="Email"
					type="email"
					name="email"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.email && formik.errors.email}
				/>
				<Input
					placeholder="Display Name"
					name="name"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.name && formik.errors.name}
				/>
				<Input
					placeholder="Password"
					type="password"
					name="password"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.password && formik.errors.password}
				/>
				<Input
					placeholder="Confirm Password"
					type="password"
					name="confpass"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.confpass && formik.errors.confpass}
				/>
				<button
					type="submit"
					className="primary-button"
					disabled={
						!formik.dirty || !formik.isValid || authStatus === "loading"
					}
				>
					{authStatus === "loading" ? (
						<LoadingSpinner className="auth-spinner" />
					) : (
						"Sign Up"
					)}
				</button>
			</form>
			<div className="switch-state">
				Already have an account?
				<span onClick={() => setAuthType("login")}> Log In</span>
			</div>
		</>
	);
}
