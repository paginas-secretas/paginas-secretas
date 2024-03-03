export type NotificationType = 'info' | 'error';

export type Notification = {
	type: NotificationType;
	title: string;
	message: string;
};
