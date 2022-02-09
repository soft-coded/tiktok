import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import Dropdown from "../../../common/components/dropdown";
import UserDropdown from "../user-dropdown";
import constants from "../../../common/constants";
import { CommentData } from "../../../common/types";
import { convertToDate, joinClasses } from "../../../common/utils";
import { likeReply, deleteReply } from "../../../common/api/video";
import { useAppSelector, useAppDispatch } from "../../../common/store";
import { notificationActions } from "../../../common/store/slices/notification-slice";

interface Props extends CommentData {
	handleModalClose: () => void;
	url: { prevURL: string };
	videoId: string;
	setTotalReplies: React.Dispatch<React.SetStateAction<number>>;
	setReplies: React.Dispatch<React.SetStateAction<CommentData[] | null>>;
	fetchReplies: () => Promise<any>;
}

export default function Reply(props: Props) {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [showUserDD, setShowUserDD] = useState(false);
	const { username, token } = useAppSelector(state => state.auth);
	const poster = props.postedBy!.username;
	const isPoster = useMemo(() => username === poster, [poster, username]);
	const [showOptions, setShowOptions] = useState(false);
	const [likeStats, setLikeStats] = useState({
		likesNum: props.likes!,
		hasLiked: props.hasLiked!
	});

	function showProfile() {
		props.url.prevURL = "/user/" + props.postedBy!.username;
		navigate("/user/" + props.postedBy!.username);
		props.handleModalClose();
	}

	async function likeRep() {
		const res = await likeReply(
			props.videoId,
			props.commentId!,
			props.replyId!,
			username!,
			token!
		);
		if (res.data.liked)
			setLikeStats(prev => ({ likesNum: prev.likesNum + 1, hasLiked: true }));
		else
			setLikeStats(prev => ({ likesNum: prev.likesNum - 1, hasLiked: false }));
	}

	function showUDD() {
		setShowUserDD(true);
	}

	function hideUDD() {
		setShowUserDD(false);
	}

	async function deleteRep() {
		try {
			await deleteReply(
				props.videoId,
				props.commentId!,
				props.replyId!,
				username!,
				token!
			);
			dispatch(
				notificationActions.showNotification({
					type: "success",
					message: "Reply deleted"
				})
			);
			props.setTotalReplies(prev => prev - 1);
			props.setReplies(null);
			props.setReplies(await props.fetchReplies());
		} catch (err: any) {
			dispatch(
				notificationActions.showNotification({
					type: "error",
					message: err.message
				})
			);
			setShowOptions(false);
		}
	}

	return (
		<div className="comment">
			<div className="dropdown-wrapper">
				<UserDropdown
					showDropdown={showUserDD}
					onMouseOver={showUDD}
					onMouseOut={hideUDD}
					username={props.postedBy!.username!}
				/>
			</div>
			<div
				className="rounded-photo clickable"
				onClick={showProfile}
				onMouseOver={showUDD}
				onMouseOut={hideUDD}
			>
				<img
					src={constants.pfpLink + "/" + props.postedBy!.username}
					alt={props.postedBy!.username}
				/>
			</div>
			<div className="comment-content">
				<div className="container-wrapper">
					<div className="content-wrapper">
						<h4
							className="clickable"
							onClick={showProfile}
							onMouseOver={showUDD}
							onMouseOut={hideUDD}
						>
							{props.postedBy!.name}
						</h4>
						<p className="break-word">{props.comment}</p>
					</div>
					<div className="likes-portion">
						{isPoster && (
							<i
								className="fas fa-ellipsis-h"
								onClick={() => setShowOptions(true)}
							/>
						)}
						{showOptions && (
							<Dropdown
								className="comment-dropdown"
								setShowDropdown={setShowOptions}
							>
								<span className="hoverable" onClick={deleteRep}>
									<i className="fas fa-trash-alt" /> Delete
								</span>
							</Dropdown>
						)}
						<div className="likes-container">
							<i
								className={joinClasses(
									likeStats.hasLiked ? "fas" : "far",
									"fa-heart",
									likeStats.hasLiked && "liked"
								)}
								onClick={likeRep}
							/>
							<span>{likeStats.likesNum}</span>
						</div>
					</div>
				</div>
				<div className="time-wrapper">
					<h5>{convertToDate(props.createdAt!)}</h5>
				</div>
			</div>
		</div>
	);
}
