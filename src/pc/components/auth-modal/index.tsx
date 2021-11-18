import { useEffect, useRef, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";

import "./auth-modal.scss";
import { modifyScrollbar, handleClickOutside } from "../../../common/utils";
import Input from "../input-field";
import { authModalActions } from "../../store/slices/auth-modal-slice";

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

export default function AuthModal() {
	const modalRef = useRef<HTMLDivElement | null>(null);
	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			username: "",
			password: ""
		},
		validationSchema,
		onSubmit: values => {
			console.log(values);
		}
	});

	useLayoutEffect(() => {
		modifyScrollbar("hide");
	}, []);

	useEffect(() => {
		// returns the event remover
		return handleClickOutside(modalRef.current, () => {
			modifyScrollbar("show");
			dispatch(authModalActions.hideModal());
		});
	}, [dispatch]);

	return (
		<>
			<div className="backdrop auth-backdrop" />
			<div className="auth-modal-container" ref={modalRef}>
				<h1>Log in to TikTok</h1>
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
				<div className="sign-up">
					Don't have an account? <span>Sign up</span>
				</div>
			</div>
		</>
	);
}
