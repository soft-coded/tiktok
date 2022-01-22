import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import PageWithNavbar from "../../components/page-with-navbar";
import "./search.scss";
import SearchBar from "../../components/search-bar";
import SearchedVideo from "../../components/searched-video";
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
	console.log(videos);
	return (
		<PageWithNavbar containerClassName="search-page">
			<header>
				<SearchBar query={query} autoFocus={!query} setQuery={setQuery} />
			</header>
			{query && (
				<div className="content">
					{!videos ? (
						<LoadingSpinner />
					) : (
						<>
							<div className="buttons">
								<button className="active">Videos</button>
								<button>Accounts</button>
							</div>
							<div className="results">
								{videos.map((vid, i) => (
									<SearchedVideo key={i} {...vid} />
								))}
							</div>
						</>
					)}
				</div>
			)}
		</PageWithNavbar>
	);
}
