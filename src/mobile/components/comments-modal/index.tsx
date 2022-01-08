import { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

import "./comments-modal.scss";
import Comment from "./Comment";
import AddComment from "./AddComment";
import { CommentData } from "../../../common/types";
import LoadingSpinner from "../../../common/components/loading-spinner";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { errorNotification } from "../../helpers/error-notification";
import { getVidComments } from "../../../common/api/video";

interface Props {
	setShowComments: React.Dispatch<React.SetStateAction<boolean>>;
	videoId: string;
	totalComments: number;
}

const animationTime = 199; // milliseconds to reveal/hide modal

export default function CommentsModal({
	videoId,
	setShowComments,
	totalComments
}: Props) {
	const dispatch = useAppDispatch();
	const username = useAppSelector(state => state.auth.username);
	const modalRef = useRef<HTMLDivElement>(null);
	const backdropRef = useRef<HTMLDivElement>(null);
	const [comments, setComments] = useState<CommentData[] | null>(null);

	useEffect(() => {
		errorNotification(
			async () => {
				const res = await getVidComments(videoId, username);
				setComments(res.data.comments);
			},
			dispatch,
			() => setComments([]),
			"Couldn't load comments:"
		);
	}, [username, dispatch, videoId]);

	useEffect(() => {
		if (!modalRef.current || !backdropRef.current) return;
		modalRef.current.classList.add("reveal");
		backdropRef.current.classList.add("show");
	}, []);

	const handleModalClose = useCallback(() => {
		modalRef.current!.classList.remove("reveal");
		modalRef.current!.classList.add("hide");

		backdropRef.current!.classList.remove("show");
		backdropRef.current!.classList.add("hide");

		setTimeout(() => {
			setShowComments(false);
		}, animationTime);
	}, [setShowComments]);

	return createPortal(
		<>
			<div
				className="backdrop comments-backdrop"
				ref={backdropRef}
				onClick={handleModalClose}
			/>
			<div className="comments-modal-container" ref={modalRef}>
				<header>
					{totalComments} {totalComments === 1 ? "comment" : "comments"}
				</header>
				{!comments ? (
					<LoadingSpinner className="spinner" />
				) : (
					<div className="comments-container">
						{comments.map((comment, i) => (
							<Comment key={i} {...comment} />
						))}
					</div>
				)}
				<AddComment />
			</div>
		</>,
		document.querySelector("#portal")!
	);
}
