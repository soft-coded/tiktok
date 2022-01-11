import { useFormik } from "formik";
import * as yup from "yup";

import { FormProps } from ".";
import Input from "../../../pc/components/input-field";
import { useAppDispatch, useAppSelector } from "../../store";
import LoadingSpinner from "../loading-spinner";
import { loginThunk } from "../../store/slices/auth";
import { notificationActions } from "../../../pc/store/slices/notification-slice";
import constants from "../../constants";

const validationSchema = yup.object().shape({
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
		),
	password: yup
		.string()
		.trim()
		.required("Required")
		.min(
			constants.passwordMinLen,
			`At least ${constants.passwordMinLen} characters`
		)
});

export default function LogIn({ setAuthType, handleModalClose }: FormProps) {
	const dispatch = useAppDispatch();
	const authStatus = useAppSelector(state => state.auth.status);

	const formik = useFormik({
		initialValues: {
			username: "",
			password: ""
		},
		validationSchema,
		onSubmit: async values => {
			try {
				await dispatch(loginThunk(values)).unwrap();
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
			<h1>Log into TikTok</h1>
			<form onSubmit={formik.handleSubmit}>
				<h3>Log in via username</h3>
				<Input
					placeholder="Username"
					name="username"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.username && formik.errors.username}
				/>
				<Input
					placeholder="Password"
					type="password"
					name="password"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.password && formik.errors.password}
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
						"Log In"
					)}
				</button>
			</form>
			<div className="switch-state">
				Don't have an account?
				<span onClick={() => setAuthType("signup")}> Sign up</span>
			</div>
		</>
	);
}
