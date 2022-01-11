import { useState, useLayoutEffect } from "react";

import "./auth-modal.scss";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import { useAppDispatch } from "../../store";
import { joinClasses, modifyScrollbar } from "../../utils";
import { authModalActions } from "../../store/slices/auth-modal-slice";
import { ComponentProps } from "../../types";

export interface FormProps {
	setAuthType: React.Dispatch<React.SetStateAction<"login" | "signup">>;
	handleModalClose: () => void;
}

interface Props extends ComponentProps {
	isMobile?: boolean;
}

export default function AuthModal({ isMobile, className }: Props) {
	const [authType, setAuthType] = useState<"login" | "signup">("login");
	const dispatch = useAppDispatch();

	useLayoutEffect(() => {
		if (isMobile) return;
		modifyScrollbar("hide");
	}, [isMobile]);

	function handleModalClose() {
		if (!isMobile) modifyScrollbar("show");
		dispatch(authModalActions.hideModal());
	}

	return (
		<>
			{!isMobile && (
				<div className="backdrop auth-backdrop" onClick={handleModalClose} />
			)}
			<div className={joinClasses("auth-modal-container", className)}>
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
