import { ReactNode } from "react";
import { createPortal } from "react-dom";

import classes from "./alert.module.scss";
import { joinClasses } from "../../utils";

interface Props {
	header: string;
	description: ReactNode;
	primaryButtonText: string;
	primaryButtonFn?: (e?: any) => void;
	secondaryButtonText?: string;
	secondaryButtonFn?: (e?: any) => void;
	backdropClassName?: string;
	containerClassName?: string;
	setShowAlert?: React.Dispatch<React.SetStateAction<boolean>>;
	isMobile?: boolean;
}

export default function Alert(props: Props) {
	return createPortal(
		<>
			<div
				className={joinClasses(
					"backdrop",
					classes["backdrop"],
					props.backdropClassName
				)}
				onClick={() => props.setShowAlert?.(false)}
			/>
			<div
				className={joinClasses(
					classes["alert"],
					props.isMobile && classes["mobile"],
					props.containerClassName
				)}
			>
				<h3>{props.header}</h3>
				<p className="break-word">{props.description}</p>
				<div className={classes["buttons"]}>
					<button
						className={joinClasses("primary-button", classes["primary-btn"])}
						onClick={props.primaryButtonFn}
					>
						{props.primaryButtonText}
					</button>
					{props.secondaryButtonText && (
						<button
							className={joinClasses(
								"secondary-button",
								classes["secondary-btn"]
							)}
							onClick={props.secondaryButtonFn}
						>
							{props.secondaryButtonText}
						</button>
					)}
				</div>
			</div>
		</>,
		document.querySelector("#portal")!
	);
}
