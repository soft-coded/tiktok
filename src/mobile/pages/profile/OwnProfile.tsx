import Profile from ".";
import { useAppSelector } from "../../../common/store";
import UnauthedPage from "../../components/unauthed-page";

export default function OwnProfile() {
	const { isAuthenticated: isAuthed } = useAppSelector(state => state.auth);

	return isAuthed ? (
		<Profile isOwn={true} />
	) : (
		<UnauthedPage
			header="Profile"
			description="Log in to view your profile"
			icon={<i className="fas fa-user" />}
		/>
	);
}
