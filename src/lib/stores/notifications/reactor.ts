import { Reactor } from '@core';
import { isShowInfoNotification, type NotificationEvent } from './event';
import { type NotificationState, NotificationUpdate } from './state';
import type { Notification, NotificationType } from '@components';

export class NotificationsReactor extends Reactor<NotificationEvent, NotificationState> {
	constructor() {
		super(NotificationUpdate([]));

		super.on<NotificationEvent>(
			async (event, emit) => {
				const notification = <Notification>{
					title: event.title,
					message: event.message,
					type: eventToType(event)
				};

				emit(NotificationUpdate([notification, ...this.state.value]));

				setTimeout(
					() => emit(NotificationUpdate([...this.state.value.filter((x) => x != notification)])),
					3500
				);
			},
			(event) => event !== undefined
		);
	}
}

function eventToType(event: NotificationEvent): NotificationType {
	if (isShowInfoNotification(event)) {
		return 'info';
	} else {
		return 'error';
	}
}
