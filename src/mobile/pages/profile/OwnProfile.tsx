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
			description="Sign up for an account"
			icon={<i className="fas fa-user" />}
		/>
	);
}
