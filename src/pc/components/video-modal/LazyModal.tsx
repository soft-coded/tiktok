import { Suspense, lazy } from "react";

import FullscreenSpinner from "../fullscreen-spinner";
import { PostData as ModalProps } from "../../../common/utils";
// ! needs error handling !
const Modal = lazy(() => import("./index"));

interface LazyModalProps extends ModalProps {
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LazyModal(props: LazyModalProps) {
	return props.showModal ? (
		<Suspense fallback={<FullscreenSpinner />}>
			<Modal {...props} />
		</Suspense>
	) : null;
}
