import classes from "./spinner.module.scss";
import { joinClasses } from "../../../common/utils";
import { ComponentProps } from "../../../common/types";

export default function LoadingSpinner({ className }: ComponentProps) {
	return (
		<div className={joinClasses(classes["spinner-wrapper"], className)}>
			<div className={classes["spinner-container"]}>
				<span
					className={joinClasses(
						classes["spinner-circle"],
						classes["spinner-circle-red"]
					)}
				/>
				<span
					className={joinClasses(
						classes["spinner-circle"],
						classes["spinner-circle-blue"]
					)}
				/>
			</div>
		</div>
	);
}
