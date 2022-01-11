import { ReactNode, forwardRef, ForwardedRef } from "react";

import classes from "./input.module.scss";
import { joinClasses } from "../../utils";

interface InputProps {
	type?: "text" | "password" | "email";
	placeholder?: string;
	id?: string;
	className?: string;
	wrapperClassName?: string;
	icon?: ReactNode;
	onChange?: (a: any) => void;
	onBlur?: (a: any) => void;
	value?: string;
	name?: string;
	error?: string | false;
	autoComplete?: string;
	isMobile?: boolean;
}

function Input(
	{
		type = "text",
		placeholder,
		id,
		className,
		wrapperClassName,
		icon,
		onChange,
		onBlur,
		value,
		name,
		error,
		autoComplete,
		isMobile
	}: InputProps,
	ref: ForwardedRef<HTMLInputElement>
) {
	return (
		<div
			className={joinClasses(
				isMobile ? classes["mobile-input-wrapper"] : classes["input-wrapper"],
				wrapperClassName
			)}
		>
			<div
				className={joinClasses(
					classes["input-field"],
					error && joinClasses(classes["error"], "error"),
					className
				)}
			>
				{icon}
				<input
					ref={ref}
					id={id}
					type={type}
					placeholder={placeholder}
					onChange={onChange}
					onKeyUp={onBlur}
					onBlur={onBlur}
					value={value}
					name={name}
					autoComplete={autoComplete}
				/>
			</div>
			{error && (
				<div
					className={joinClasses(classes["error-container"], "error-container")}
				>
					{error}
				</div>
			)}
		</div>
	);
}

export default forwardRef(Input);
