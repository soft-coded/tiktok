import { notificationActions } from "../../../common/store/slices/notification-slice";
import { useAppDispatch } from "../../../common/store";

export async function errorNotification(
	fn: () => any,
	dispatch: ReturnType<typeof useAppDispatch>,
	errFn?: (() => any) | null,
	errMessage?: string | null
) {
	try {
		await fn();
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
