<script>
	import { ReactorListener, registerVault, withVault } from '@core';
	import '../app.css';
	import { NotificationsReactor } from '@stores';
	import { VerticalNotificationGroup } from '@components';

	registerVault(globalThis.window, new NotificationsReactor());
	const notificationsReactor = withVault().notificationsReactor;
</script>

<ReactorListener reactor={notificationsReactor}>
	<slot />
	<VerticalNotificationGroup values={$notificationsReactor.value} />
</ReactorListener>
