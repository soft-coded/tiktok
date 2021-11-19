import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";

import { FormProps } from ".";
import Input from "../input-field";
import { authActions } from "../../../common/store/slices/auth";

const validationSchema = yup.object().shape({
	username: yup
		.string()
		.trim()
		.required("Required")
		.max(10, "At most 10 characters"),
	password: yup
		.string()
		.trim()
		.required("Required")
		.min(6, "At least 6 characters")
});

export default function LogIn({ setAuthType, handleModalClose }: FormProps) {
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			username: "",
			password: ""
		},
		validationSchema,
		onSubmit: values => {
			dispatch(authActions.login({ username: values.username }));
			handleModalClose();
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
					disabled={!formik.dirty || !formik.isValid}
				>
					Log In
				</button>
			</form>
			<div className="switch-state">
				Don't have an account?
				<span onClick={() => setAuthType("signup")}> Sign up</span>
			</div>
		</>
	);
}
