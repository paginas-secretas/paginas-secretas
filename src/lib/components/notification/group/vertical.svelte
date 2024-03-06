<script lang="ts">
	import { type Notification, NotificationPopup } from '@components';

	export let values: Notification[];
</script>

<div class="flex flex-col fixed top-2 right-2 gap-2">
	{#each values as value}
		<NotificationPopup {value} />
	{/each}
</div>
