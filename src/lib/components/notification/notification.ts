export type NotificationType = 'info' | 'warning' | 'error';

export type Notification = {
	type: NotificationType;
	title: string;
	message: string;
};
