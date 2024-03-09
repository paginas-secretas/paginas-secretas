<script>
	import { ReactorProvider, registerVault } from '@core';
	import '../app.css';
	import { NotificationsReactor } from '@stores';
	import {
		GlobalBetaBadge,
		MobileLayoutNotSupported,
		VerticalNotificationGroup
	} from '@components';
	import { EmojiLumberdashClient, putLumberdashToWork } from '@web-pacotes/lumberdash';
	import ClientSideRouting from './csr.svelte';

	registerVault(globalThis.window);
	putLumberdashToWork([new EmojiLumberdashClient()]);

	const notifications = new NotificationsReactor();
</script>

<GlobalBetaBadge />

<div class="max-lg:hidden">
	<ReactorProvider reactor={notifications}>
		<ClientSideRouting>
			<slot />
		</ClientSideRouting>
		<VerticalNotificationGroup values={$notifications.value} />
	</ReactorProvider>
</div>

<div class="lg:hidden">
	<div class="flex flex-col justify-center h-screen">
		<MobileLayoutNotSupported />
	</div>
</div>
