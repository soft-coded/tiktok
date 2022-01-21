import { useLocation } from "react-router-dom";

import PageWithNavbar from "../../components/page-with-navbar";
import "./search.scss";
import SearchBar from "../../components/search-bar";

export default function Search() {
	const query = new URLSearchParams(useLocation().search).get("query");

	return (
		<PageWithNavbar containerClassName="search-page">
			<header>
				<SearchBar query={query || ""} autoFocus={!query} />
			</header>
		</PageWithNavbar>
	);
}
