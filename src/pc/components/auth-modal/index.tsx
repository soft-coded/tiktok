import { useState, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";

import "./auth-modal.scss";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import { modifyScrollbar } from "../../../common/utils";
import { authModalActions } from "../../store/slices/auth-modal-slice";

export interface FormProps {
	setAuthType: React.Dispatch<React.SetStateAction<"login" | "signup">>;
	handleModalClose: () => void;
}

export default function AuthModal() {
	const [authType, setAuthType] = useState<"login" | "signup">("login");
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		modifyScrollbar("hide");
	}, []);

	function handleModalClose() {
		modifyScrollbar("show");
		dispatch(authModalActions.hideModal());
	}

	return (
		<>
			<div className="backdrop auth-backdrop" onClick={handleModalClose} />
			<div className="auth-modal-container">
				{authType === "login" ? (
					<LogIn
						setAuthType={setAuthType}
						handleModalClose={handleModalClose}
					/>
				) : (
					<SignUp
						setAuthType={setAuthType}
						handleModalClose={handleModalClose}
					/>
				)}
			</div>
		</>
	);
}
