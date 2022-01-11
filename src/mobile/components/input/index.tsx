import { forwardRef, ForwardedRef } from "react";

import classes from "./input.module.scss";
import { ComponentProps } from "../../../common/types";
import { joinClasses } from "../../../common/utils";

interface Props extends ComponentProps {
	type?: "text" | "password" | "email";
	id?: string;
	name?: string;
	error?: string | false | null;
	placeholder?: string;
	value?: string;
	autoComplete?: "off";
	onChange?: (e?: any) => void;
	onBlur?: (e?: any) => void;
}

function Input(props: Props, inputRef: ForwardedRef<HTMLInputElement>) {
	return (
		<div className={classes["input-wrapper"]}>
			<div
				className={joinClasses(
					classes["input-container"],
					props.error && classes["error"],
					props.className
				)}
			>
				<input
					ref={inputRef}
					type={props.type || "text"}
					id={props.id}
					name={props.name}
					placeholder={props.placeholder}
					value={props.value}
					autoComplete={props.autoComplete}
					onChange={props.onChange}
					onBlur={props.onBlur}
					onKeyUp={props.onBlur}
				/>
			</div>
			{props.error && (
				<p className={joinClasses(classes["input-error"], "input-error")}>
					{props.error}
				</p>
			)}
		</div>
	);
}

export default forwardRef(Input);
