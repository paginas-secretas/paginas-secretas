<script>
	import { ReactorProvider, registerVault } from '@core';
	import '../app.css';
	import { NotificationsReactor } from '@stores';
	import { GlobalBetaBadge, VerticalNotificationGroup } from '@components';

	registerVault(globalThis.window);
	const notifications = new NotificationsReactor();
</script>

<GlobalBetaBadge />

<ReactorProvider reactor={notifications}>
	<slot />
	<VerticalNotificationGroup values={$notifications.value} />
</ReactorProvider>
