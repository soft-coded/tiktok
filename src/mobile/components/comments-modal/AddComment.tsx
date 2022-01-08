import { useFormik } from "formik";
import * as yup from "yup";

import "./comments-modal.scss";
import Input from "../input";
import constants from "../../../common/constants";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { errorNotification } from "../../helpers/error-notification";
import { postComment } from "../../../common/api/video";
import { notificationActions } from "../../store/slices/notification-slice";
import { CommentData } from "../../../common/types";

interface Props {
	videoId: string;
	fetchComments: () => void;
	setComments: React.Dispatch<React.SetStateAction<CommentData[] | null>>;
}

const validationSchema = yup.object().shape({
	comment: yup
		.string()
		.required("")
		.max(
			constants.commentMaxLen,
			`At most ${constants.commentMaxLen} characters`
		)
});

export default function AddComment({
	fetchComments,
	videoId,
	setComments
}: Props) {
	const dispatch = useAppDispatch();
	const username = useAppSelector(state => state.auth.username!);
	const formik = useFormik({
		initialValues: {
			comment: ""
		},
		validationSchema,
		onSubmit: ({ comment }) => {
			errorNotification(
				async () => {
					await postComment(username, comment, videoId);
					dispatch(
						notificationActions.showNotification({
							type: "success",
							message: "Comment posted"
						})
					);
					formik.setFieldValue("comment", "");
					setComments(null);
					fetchComments();
				},
				dispatch,
				null,
				"Couldn't post comment:"
			);
		}
	});

	return (
		<form className="add-comment-container" onSubmit={formik.handleSubmit}>
			<Input
				placeholder="Add a comment"
				name="comment"
				autoComplete="off"
				value={formik.values.comment}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={formik.errors.comment}
			/>
			<button
				type="submit"
				className="primary-button"
				disabled={!formik.dirty || !formik.isValid}
			>
				<i className="fas fa-arrow-up" />
			</button>
		</form>
	);
}
