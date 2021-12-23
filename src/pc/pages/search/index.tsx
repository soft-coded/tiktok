import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";

import "./search.scss";
import PageWithSidebar from "../../components/page-with-sidebar";
import AccountCard from "../../components/search-results/AccountCard";
import VideoCard from "../../components/search-results/VideoCard";
import { useAppDispatch } from "../../../common/store";
import { search } from "../../../common/api/feed";
import { notificationActions } from "../../store/slices/notification-slice";
import { UserData, VideoData } from "../../../common/types";
import { joinClasses } from "../../../common/utils";
import LoadingSpinner from "../../components/loading-spinner";

export default function Search() {
	const query = new URLSearchParams(useLocation().search).get("query");
	const dispatch = useAppDispatch();
	const [accounts, setAccounts] = useState<UserData[] | null>(null);
	const [videos, setVideos] = useState<VideoData[] | null>(null);
	const [activeTab, setActiveTab] = useState<"accounts" | "videos">("accounts");

	const fetchResults = useCallback(
		async (send: "accounts" | "videos") => {
			try {
				if (!query) throw new Error("Invalid search query");
				const res = await search(query, send);
				if (send === "accounts") setAccounts(res.data.accounts);
				else setVideos(res.data.videos);
			} catch (err: any) {
				dispatch(
					notificationActions.showNotification({
						type: "error",
						message: err.message
					})
				);
			}
		},
		[dispatch, query]
	);

	useEffect(() => {
		fetchResults("accounts");
	}, [fetchResults]);

	const handleVideosClick = useCallback(() => {
		if (!videos) fetchResults("videos");
		setActiveTab("videos");
	}, [videos, fetchResults]);

	return (
		<PageWithSidebar className="search-page-container">
			<div className="content-container">
				<nav>
					<span
						className={joinClasses(
							"clickable",
							activeTab === "accounts" && "active"
						)}
						onClick={() => setActiveTab("accounts")}
					>
						Accounts
					</span>
					<span
						className={joinClasses(
							"clickable",
							activeTab === "videos" && "active"
						)}
						onClick={handleVideosClick}
					>
						Videos
					</span>
				</nav>
				{activeTab === "accounts" ? (
					<div className="acc-results">
						{!accounts ? (
							<LoadingSpinner />
						) : accounts.length === 0 ? (
							<div className="no-results">
								No accounts match your query "{query}".
							</div>
						) : (
							accounts.map((acc, i) => <AccountCard key={i} {...acc} />)
						)}
					</div>
				) : (
					<div className={joinClasses("vid-results", !videos && "ungrid")}>
						{!videos ? (
							<LoadingSpinner />
						) : videos.length === 0 ? (
							<div className="no-results">
								No videos match your query "{query}".
							</div>
						) : (
							videos.map((vid, i) => <VideoCard key={i} {...vid} />)
						)}
					</div>
				)}
			</div>
		</PageWithSidebar>
	);
}
