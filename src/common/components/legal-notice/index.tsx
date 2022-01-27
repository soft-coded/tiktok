import Alert from "../alert";
import "./legal-notice.scss";

interface Props {
	setShowNotice: React.Dispatch<React.SetStateAction<boolean>>;
	isMobile?: boolean;
}

export default function LegalNotice({ setShowNotice, isMobile }: Props) {
	return (
		<Alert
			header="Notice"
			description={
				<>
					This open source project is not affiliated with TikTok or ByteDance in
					any way and should not be confused with the former.
					<br />
					<br /> This project is licenced under
					<a
						href="https://github.com/soft-coded/tiktok/blob/main/LICENSE"
						target="_blank"
						rel="noreferrer"
					>
						Creative Commons.
					</a>
					Contact
					<a href="mailto:shrutanten.work@gmail.com">
						shrutanten.work@gmail.com
					</a>
					for legal stuff.
					<br />
					<br /> TikTok, TikTok logo and basically everything used here are
					trademarks of ByteDance.
				</>
			}
			containerClassName="legal-notice"
			primaryButtonText="Okay, got it"
			primaryButtonFn={() => setShowNotice(false)}
			isMobile={isMobile}
		/>
	);
}
