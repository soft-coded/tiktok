import { useFormik } from "formik";
import * as yup from "yup";

import Input from "../input-field";
import { useAppSelector, useAppDispatch } from "../../../common/store";
import constants from "../../../common/constants";
import { notificationActions } from "../../../common/store/slices/notification-slice";
import { postComment } from "../../../common/api/video";
import { CommentData } from "../../../common/types";

const validationSchema = yup.object().shape({
	comment: yup
		.string()
		.trim()
		.required("")
		.max(
			constants.commentMaxLen,
			`At most ${constants.commentMaxLen} characters`
		)
});

interface Props {
	fetchComments: () => Promise<void>;
	videoId: string;
	setComments: React.Dispatch<React.SetStateAction<CommentData[] | null>>;
	fetchCommentsNum: () => Promise<void>;
}

export default function AddComment({
	videoId,
	fetchComments,
	fetchCommentsNum,
	setComments
}: Props) {
	const username = useAppSelector(state => state.auth.username);
	const dispatch = useAppDispatch();
	const formik = useFormik({
		initialValues: { comment: "" },
		validationSchema,
		onSubmit: async ({ comment }) => {
			try {
				await postComment(username!, comment, videoId);
				dispatch(
					notificationActions.showNotification({
						type: "success",
						message: "Comment posted"
					})
				);
				setComments(null);
				fetchComments();
				formik.setFieldValue("comment", "");
				fetchCommentsNum();
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
		<form className="post-comment" onSubmit={formik.handleSubmit}>
			<Input
				id="comment"
				autoComplete="off"
				placeholder="Add a comment"
				className="comment-input"
				wrapperClassName="input-wrapper"
				name="comment"
				value={formik.values.comment}
				error={formik.touched.comment && formik.errors.comment}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
			/>
			<button type="submit" disabled={!formik.dirty || !formik.isValid}>
				Post
			</button>
		</form>
	);
}
