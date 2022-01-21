import { useFormik } from "formik";
import * as yup from "yup";

import Input from "../../../common/components/input-field";
import classes from "./search-bar.module.scss";
import constants from "../../../common/constants";

interface Props {
	autoFocus: boolean;
	query: string;
}

const validationSchema = yup.object().shape({
	query: yup.string().required("").max(constants.searchQueryMaxLen, "")
});

export default function SearchBar({ autoFocus, query }: Props) {
	const formik = useFormik({
		initialValues: { query },
		enableReinitialize: true,
		validationSchema,
		onSubmit: () => {}
	});

	return (
		<form className={classes["search-bar"]} onSubmit={formik.handleSubmit}>
			<Input
				isMobile
				autoFocus={autoFocus}
				className={classes["input"]}
				name="query"
				value={formik.values.query}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={formik.touched.query && formik.errors.query}
			/>
			<button type="submit" disabled={!formik.dirty || !formik.isValid}>
				<i className="fas fa-search" />
			</button>
		</form>
	);
}
