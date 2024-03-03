import { isTypedOf } from '@core';

export function ShowInfoNotification(title: string, message: string) {
	return {
		title: title,
		message: message,
		type: 'show-info-notification' as const
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
export type ShowErrorNotification = ReturnType<typeof ShowErrorNotification>;

export type NotificationEvent = ShowInfoNotification | ShowErrorNotification;

export const isShowInfoNotification = (event: NotificationEvent) =>
	isTypedOf<ShowInfoNotification>(event, 'show-info-notification');
export const isShowErrorNotification = (event: NotificationEvent) =>
	isTypedOf<ShowErrorNotification>(event, 'show-error-notification');
