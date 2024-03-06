<script>
	import { ReactorProvider, registerVault } from '@core';
	import '../app.css';
	import { NotificationsReactor } from '@stores';
	import { VerticalNotificationGroup } from '@components';

	registerVault(globalThis.window);
	const notifications = new NotificationsReactor();
</script>

<ReactorProvider reactor={notifications}>
	<slot />
	<VerticalNotificationGroup values={$notifications.value} />
</ReactorProvider>
