import Container from "../container";
import Sidebar from "../sidebar";

interface Props {
	children: React.ReactNode;
	className?: string;
}

export default function PageWithSidebar({ children, className }: Props) {
	return (
		<Container className={className}>
			<Sidebar />
			{children}
		</Container>
	);
}
