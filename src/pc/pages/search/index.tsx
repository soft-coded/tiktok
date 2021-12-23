import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";

import "./search.scss";
import PageWithSidebar from "../../components/page-with-sidebar";
import { useAppDispatch } from "../../../common/store";
import { search } from "../../../common/api/feed";
import { notificationActions } from "../../store/slices/notification-slice";
import { UserData, VideoData } from "../../../common/types";
import { joinClasses } from "../../../common/utils";

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
				setAccounts(res.data.accounts);
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

	return (
		<PageWithSidebar className="search-page-container">
			<div className="content-container">
				<nav>
					<span
						className={joinClasses(
							"clickable",
							activeTab === "accounts" && "active"
						)}
					>
						Accounts
					</span>
					<span
						className={joinClasses(
							"clickable",
							activeTab === "videos" && "active"
						)}
					>
						Videos
					</span>
				</nav>
			</div>
		</PageWithSidebar>
	);
}
