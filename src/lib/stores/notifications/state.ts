import type { Notification } from '@components';

export function NotificationUpdate(value: Notification[]) {
	return { type: 'notification-update' as const, value: value };
}

export type NotificationUpdate = ReturnType<typeof NotificationUpdate>;

export type NotificationState = NotificationUpdate;
