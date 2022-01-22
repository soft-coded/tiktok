import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import PageWithNavbar from "../../components/page-with-navbar";
import "./search.scss";
import SearchBar from "../../components/search-bar";
import SearchedVideo from "../../components/searched-video";
import SearchedAccount from "../../components/searched-account";
import { errorNotification } from "../../helpers/error-notification";
import { useAppDispatch } from "../../../common/store";
import { UserData, VideoData } from "../../../common/types";
import { search } from "../../../common/api/feed";
import LoadingSpinner from "../../../common/components/loading-spinner";

type sendType = "videos" | "accounts";

export default function Search() {
	const dispatch = useAppDispatch();
	const params = new URLSearchParams(useLocation().search);
	const [query, setQuery] = useState<string>(params.get("query") || "");
	const [send, setSend] = useState<sendType>(
		(params.get("send") as sendType) || "videos"
	);
	const [videos, setVideos] = useState<VideoData[] | null>(null);
	const [accounts, setAccounts] = useState<UserData[] | null>(null);

	useEffect(() => {
		if (!query) return;
		errorNotification(
			async () => {
				if (send === "videos") setVideos(null);
				else setAccounts(null);
				const res = await search(query, send);
				if (send === "videos") setVideos(res.data.videos);
				else setAccounts(res.data.accounts);
			},
			dispatch,
			() => {
				if (send === "videos") setVideos([]);
				else setAccounts([]);
			},
			"Couldn't load results:"
		);
	}, [dispatch, query, send]);

	return (
		<PageWithNavbar containerClassName="search-page">
			<header>
				<SearchBar query={query} autoFocus={!query} setQuery={setQuery} />
			</header>
			{query && (
				<div className="content">
					<div className="buttons">
						<button
							className={send === "videos" ? "active" : undefined}
							onClick={() => setSend("videos")}
						>
							Videos
						</button>
						<button
							className={send === "accounts" ? "active" : undefined}
							onClick={() => setSend("accounts")}
						>
							Accounts
						</button>
					</div>
					{send === "videos" ? (
						!videos ? (
							<LoadingSpinner className="spinner" />
						) : (
							<>
								{videos.length === 0 ? (
									<div className="no-results">
										No videos match your query "{query}".
									</div>
								) : (
									<div className="vid-results">
										{videos.map((vid, i) => (
											<SearchedVideo key={i} {...vid} />
										))}
									</div>
								)}
							</>
						)
					) : !accounts ? (
						<LoadingSpinner className="spinner" />
					) : (
						<>
							{accounts.length === 0 ? (
								<div className="no-results">
									No accounts match your query "{query}".
								</div>
							) : (
								<div className="acc-results">
									{accounts.map((acc, i) => (
										<SearchedAccount key={i} {...acc} />
									))}
								</div>
							)}
						</>
					)}
				</div>
			)}
		</PageWithNavbar>
	);
}
