import "./profile.scss";
import { useAppSelector } from "../../../common/store";
import UnauthedPage from "../../components/unauthed-page";

export default function OwnProfile() {
	const isAuthed = useAppSelector(state => state.auth.isAuthenticated);

	return isAuthed ? (
		<div className="own-profile"></div>
	) : (
		<UnauthedPage
			header="Profile"
			description="Log in to view your profile"
			icon={<i className="fas fa-user" />}
		/>
	);
}
