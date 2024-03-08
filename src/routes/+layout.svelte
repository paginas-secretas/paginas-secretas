<script>
	import { ReactorProvider, registerVault } from '@core';
	import '../app.css';
	import { NotificationsReactor } from '@stores';
	import { VerticalNotificationGroup } from '@components';
	import { EmojiLumberdashClient, putLumberdashToWork } from '@web-pacotes/lumberdash';

	registerVault(globalThis.window);
	putLumberdashToWork([new EmojiLumberdashClient()]);

	const notifications = new NotificationsReactor();
</script>

<ReactorProvider reactor={notifications}>
	<slot />
	<VerticalNotificationGroup values={$notifications.value} />
</ReactorProvider>
