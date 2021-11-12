import { ReactNode } from "react";

interface ABProps {
	number: string;
	icon: ReactNode;
}

export default function ActionButton({ number, icon }: ABProps) {
	return (
		<div className="action-btn-container">
			<div className="action-btn">{icon}</div>
			<span>{number}</span>
		</div>
	);
}
