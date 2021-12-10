import { useFormik } from "formik";
import * as yup from "yup";

import Input from "../input-field";
import constants from "../../../common/constants";
import { reply } from "../../../common/api/video";
import { useAppSelector, useAppDispatch } from "../../../common/store";
import { CommentData } from "../../../common/types";
import { notificationActions } from "../../store/slices/notification-slice";

const validationSchema = yup.object().shape({
	comment: yup
		.string()
		.required("")
		.max(
			constants.commentMaxLen,
			`At most ${constants.commentMaxLen} characters`
		)
});

interface Props {
	commentId: string;
	videoId: string;
	setReplies: React.Dispatch<React.SetStateAction<CommentData[] | null>>;
	setShowReplies: React.Dispatch<React.SetStateAction<boolean>>;
	hideReplyInput: () => void;
	fetchReplies: () => Promise<any>;
	setTotalReplies: React.Dispatch<React.SetStateAction<number>>;
}

export default function ReplyForm(props: Props) {
	const username = useAppSelector(state => state.auth.username);
	const dispatch = useAppDispatch();

	const formik = useFormik({
		initialValues: {
			comment: ""
		},
		validationSchema,
		onSubmit: async ({ comment }) => {
			try {
				await reply(comment, props.commentId, props.videoId, username!);
				dispatch(
					notificationActions.showNotification({
						type: "success",
						message: "Reply added"
					})
				);
				props.setReplies(null);
				props.setReplies(await props.fetchReplies());
				props.setTotalReplies(prev => prev + 1);
				formik.setFieldValue("comment", "");
				props.hideReplyInput();
				props.setShowReplies(true);
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
		<form className="reply" onSubmit={formik.handleSubmit}>
			<Input
				className="reply-input"
				placeholder="Add a reply"
				wrapperClassName="reply-wrapper"
				name="comment"
				value={formik.values.comment}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={formik.touched.comment && formik.errors.comment}
				autoComplete="off"
			/>
			<button type="submit" disabled={!formik.dirty || !formik.isValid}>
				<i className="fas fa-paper-plane" />
			</button>
		</form>
	);
}
