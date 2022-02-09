import { useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import "./comments-modal.scss";
import Input from "../../../common/components/input-field";
import constants from "../../../common/constants";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { errorNotification } from "../../helpers/error-notification";
import { postComment, reply } from "../../../common/api/video";
import { notificationActions } from "../../../common/store/slices/notification-slice";
import { CommentData } from "../../../common/types";
import { ReplyTo } from ".";

interface Props {
	videoId: string;
	fetchComments: () => void;
	setComments: React.Dispatch<React.SetStateAction<CommentData[] | null>>;
	replyTo: ReplyTo | null;
	setReplyTo: React.Dispatch<React.SetStateAction<ReplyTo | null>>;
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
	setComments,
	replyTo,
	setReplyTo
}: Props) {
	const dispatch = useAppDispatch();
	const { username, token } = useAppSelector(state => state.auth);
	const inputRef = useRef<HTMLInputElement>(null);
	const formik = useFormik({
		initialValues: {
			comment: ""
		},
		validationSchema,
		onSubmit: ({ comment }) => {
			errorNotification(
				async () => {
					if (replyTo) {
						await reply(comment, replyTo.commentId, videoId, username!, token!);
						dispatch(
							notificationActions.showNotification({
								type: "success",
								message: "Reply posted"
							})
						);
						formik.setFieldValue("comment", "");
						replyTo.setRepliesNum(prev => prev + 1);
						replyTo.setReplies(null);
						replyTo.setShowReplies(true);
						replyTo.fetchReplies();
						setReplyTo(null);
						return;
					}
					await postComment(username!, comment, videoId, token!);
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
				"Couldn't post " + (replyTo ? "reply:" : "comment:")
			);
		}
	});

	useEffect(() => {
		if (!replyTo || !inputRef.current) return;
		inputRef.current.focus();
	}, [replyTo]);

	return (
		<form className="add-comment-container" onSubmit={formik.handleSubmit}>
			<Input
				ref={inputRef}
				placeholder={replyTo ? "Reply to @" + replyTo.name : "Add a comment"}
				name="comment"
				autoComplete="off"
				value={formik.values.comment}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={formik.errors.comment}
				isMobile
			/>
			<button
				type="submit"
				className="primary-button"
				disabled={!formik.dirty || !formik.isValid}
			>
				<i className="fas fa-arrow-up" />
			</button>
			{replyTo && (
				<button
					type="button"
					className="cancel-reply"
					onClick={() => setReplyTo(null)}
					title="Cancel reply"
				>
					<i className="fas fa-close" />
				</button>
			)}
		</form>
	);
}
