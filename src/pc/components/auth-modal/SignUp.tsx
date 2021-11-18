import { useFormik } from "formik";
import * as yup from "yup";

import { FormProps } from ".";
import Input from "../input-field";

const validationSchema = yup.object().shape({
	email: yup.string().trim().required("Required").email("Invalid email"),
	username: yup
		.string()
		.trim()
		.required("Required")
		.max(10, "At most 10 characters"),
	password: yup
		.string()
		.trim()
		.required("Required")
		.min(6, "At least 6 characters"),
	confpass: yup
		.string()
		.trim()
		.required("Required")
		.oneOf([yup.ref("password"), null], "Passwords do not match")
});

export default function SignUp({ setAuthType }: FormProps) {
	const formik = useFormik({
		initialValues: {
			email: "",
			username: "",
			password: "",
			confpass: ""
		},
		validationSchema,
		onSubmit: values => {
			console.log(values);
		}
	});

	return (
		<>
			<h1>Sign up</h1>
			<form onSubmit={formik.handleSubmit}>
				<h3>Sign up via email</h3>
				<Input
					placeholder="Email"
					type="email"
					name="email"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.email && formik.errors.email}
				/>
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
					disabled={!formik.dirty || !formik.isValid}
				>
					Log In
				</button>
			</form>
			<div className="switch-state">
				Already have an account?
				<span onClick={() => setAuthType("login")}> Log In</span>
			</div>
		</>
	);
}
