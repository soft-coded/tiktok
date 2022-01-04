import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";

import "./search.scss";
import PageWithSidebar from "../../components/page-with-sidebar";
import AccountCard from "../../components/search-results/AccountCard";
import VideoCard from "../../components/search-results/VideoCard";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { search } from "../../../common/api/feed";
import { notificationActions } from "../../store/slices/notification-slice";
import { UserData, VideoData } from "../../../common/types";
import { joinClasses } from "../../../common/utils";
import LoadingSpinner from "../../../common/components/loading-spinner";
import { searchActions } from "../../store/slices/search-slice";

type sendType = "accounts" | "videos";
let prevQuery: string | null = null;

export default function Search() {
	const params = new URLSearchParams(useLocation().search);
	const query = params.get("query");
	const send = (params.get("send") as sendType) || "accounts";
	const storeQuery = useAppSelector(state => state.pc.search.query);
	const dispatch = useAppDispatch();
	const [accounts, setAccounts] = useState<UserData[] | null>(null);
	const [videos, setVideos] = useState<VideoData[] | null>(null);
	const [activeTab, setActiveTab] = useState<sendType>(send);

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
		fetchResults(send);
	}, [fetchResults, send]);

	// need this only when the component is mounted
	useEffect(() => {
		if (query !== storeQuery) dispatch(searchActions.putQuery(query));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	useEffect(() => {
		return () => {
			dispatch(searchActions.dropQuery());
		};
	}, [dispatch]);

	useEffect(() => {
		if (prevQuery !== query) {
			setAccounts(null);
			setVideos(null);
		}

		return () => {
			prevQuery = query;
		};
	}, [query]);

	const handleNavClick = useCallback(
		(send: sendType) => {
			if (send === "videos") {
				if (!videos) fetchResults("videos");
				setActiveTab("videos");
			} else {
				if (!accounts) fetchResults("accounts");
				setActiveTab("accounts");
			}
		},
		[fetchResults, videos, accounts]
	);

	return (
		<PageWithSidebar className="search-page-container">
			<div className="content-container">
				<nav>
					<span
						className={joinClasses(
							"clickable",
							activeTab === "accounts" && "active"
						)}
						onClick={() => handleNavClick("accounts")}
					>
						Accounts
					</span>
					<span
						className={joinClasses(
							"clickable",
							activeTab === "videos" && "active"
						)}
						onClick={() => handleNavClick("videos")}
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
