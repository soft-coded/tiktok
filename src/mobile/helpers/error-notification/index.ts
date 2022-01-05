import { notificationActions } from "../../store/slices/notification-slice";
import { useAppDispatch } from "../../../common/store";

export async function errorNotification(
	fn: () => any,
	dispatch: ReturnType<typeof useAppDispatch>,
	errFn?: (() => any) | null,
	errMessage?: string | null
) {
	try {
		return await fn();
	} catch (err: any) {
		dispatch(
			notificationActions.showNotification({
				type: "error",
				message: errMessage ? errMessage + " " + err.message : err.message
			})
		);
		errFn?.();
	}
}
