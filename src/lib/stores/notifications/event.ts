import { isTypedOf } from '@core';

export function ShowInfoNotification(title: string, message: string) {
	return {
		title: title,
		message: message,
		type: 'show-info-notification' as const
	};
}

export function ShowWarningNotification(title: string, message: string) {
	return {
		title: title,
		message: message,
		type: 'show-warning-notification' as const
	};
}

export function ShowErrorNotification(title: string, message: string) {
	return {
		title: title,
		message: message,
		type: 'show-error-notification' as const
	};
}

export type ShowInfoNotification = ReturnType<typeof ShowInfoNotification>;
export type ShowWarningNotification = ReturnType<typeof ShowWarningNotification>;
export type ShowErrorNotification = ReturnType<typeof ShowErrorNotification>;

export type NotificationEvent =
	| ShowInfoNotification
	| ShowWarningNotification
	| ShowErrorNotification;

export const isShowInfoNotification = (event: NotificationEvent) =>
	isTypedOf<ShowInfoNotification>(event, 'show-info-notification');
export const isShowWarningNotification = (event: NotificationEvent) =>
	isTypedOf<ShowWarningNotification>(event, 'show-warning-notification');
export const isShowErrorNotification = (event: NotificationEvent) =>
	isTypedOf<ShowErrorNotification>(event, 'show-error-notification');
