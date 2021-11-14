import "./spinner.scss";

export default function LoadingSpinner({ className }: { className?: string }) {
	return (
		<div
			className={className ? `spinner-wrapper ${className}` : "spinner-wrapper"}
		>
			<div className="spinner-container">
				<span className="spinner-circle spinner-circle-red" />
				<span className="spinner-circle spinner-circle-blue" />
			</div>
		</div>
	);
}
