import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

import classes from "./header.module.scss";
import constants from "../../../common/constants";

const validationSchema = yup.object().shape({
	query: yup.string().required("").max(constants.searchQueryMaxLen, "")
});

export default function SearchBar() {
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			query: ""
		},
		validationSchema,
		onSubmit: ({ query }) => {
			navigate("/search?query=" + query);
		}
	});

	return (
		<form className={classes["search-bar"]} onSubmit={formik.handleSubmit}>
			<input
				type="text"
				placeholder="Search accounts and videos"
				name="query"
				value={formik.values.query}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				onKeyUp={formik.handleBlur}
			/>
			<span />
			<button type="submit">
				<i className="fas fa-search" />
			</button>
		</form>
	);
}
