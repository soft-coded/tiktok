import classes from "./header.module.scss";

export default function SearchBar() {
	return (
		<div className={classes["search-bar"]}>
			<input type="text" placeholder="Search accounts and videos" />
			<span />
			<button>
				<i className="fas fa-search"></i>
			</button>
		</div>
	);
}
