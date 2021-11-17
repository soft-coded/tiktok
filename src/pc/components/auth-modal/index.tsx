import { useEffect, useRef } from "react";

import "./auth-modal.scss";
import { modifyScrollbar } from "../../../common/utils";
import Input from "../input-field";
import { handleClickOutside } from "../../../common/utils";

export default function AuthModal() {
	const modalRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		modifyScrollbar("hide");
		// returns the event remover
		return handleClickOutside(modalRef.current, () => console.log("clicked"));
	}, []);

	return (
		<>
			<div className="backdrop auth-backdrop" />
			<div className="auth-modal-container" ref={modalRef}>
				<h1>Log in to TikTok</h1>
				<form>
					<h3>Email or Username</h3>
					<Input placeholder="Email or Username" />
					<Input placeholder="Password" type="password" />
					<button type="submit" className="primary-button" disabled>
						Log In
					</button>
				</form>
				<div className="sign-up">
					Don't have an account? <span>Sign up</span>
				</div>
			</div>
		</>
	);
}
