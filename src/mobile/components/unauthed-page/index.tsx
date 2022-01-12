import { ReactNode } from "react";

import "./unauthed-page.scss";
import { ComponentProps } from "../../../common/types";
import { useAppDispatch } from "../../../common/store";
import { authModalActions } from "../../../common/store/slices/auth-modal-slice";

interface Props extends ComponentProps {
	header: string;
	options?: ReactNode;
	icon: ReactNode;
	description: string;
}

export default function UnauthedPage({
	header,
	icon,
	description,
	options
}: Props) {
	const dispatch = useAppDispatch();

	function handleAuthModalOpen() {
		dispatch(authModalActions.showModal());
	}

	return (
		<div className="unauthed-page">
			<header>
				<div />
				<h4>{header}</h4>
				<div>{options}</div>
			</header>
			<div className="content">
				<div className="container">
					{icon}
					<p>{description}</p>
					<button className="primary-button" onClick={handleAuthModalOpen}>
						Log in
					</button>
				</div>
			</div>
		</div>
	);
}
