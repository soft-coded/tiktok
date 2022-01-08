import { forwardRef, ForwardedRef } from "react";

import classes from "./input.module.scss";
import { ComponentProps } from "../../../common/types";
import { joinClasses } from "../../../common/utils";

interface Props extends ComponentProps {
	type?: "text" | "password" | "email";
	id?: string;
	error?: string | null;
	placeholder?: string;
	value?: string;
	onChange?: () => void;
	onBlur?: () => void;
}

function Input(
	{ className, type, id, error, placeholder, value, onBlur, onChange }: Props,
	inputRef: ForwardedRef<HTMLInputElement>
) {
	return (
		<div className={classes["input-wrapper"]}>
			<div
				className={joinClasses(
					classes["input-container"],
					error && classes["error"],
					className
				)}
			>
				<input
					ref={inputRef}
					type={type || "text"}
					id={id}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					onKeyUp={onBlur}
				/>
			</div>
			{error && (
				<p className={joinClasses(classes["input-error"], "input-error")}>
					{error}
				</p>
			)}
		</div>
	);
}

export default forwardRef(Input);
