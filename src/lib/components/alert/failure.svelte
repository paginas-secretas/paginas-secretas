<script lang="ts">
	import type { FailureAlert } from './alert';
	import { SimpleAlert, UnexpectedFailure } from '@components';

	export let value: FailureAlert;
	const hasSlot = $$props.$$slots !== undefined;
</script>

<SimpleAlert {value}>
	{#if hasSlot}
		<slot />
	{:else}
		<UnexpectedFailure />
	{/if}

	{#if value.error}
		<details>
			<summary>
				Stack-trace

			</summary>
			<div class="break-words whitespace-pre-wrap">{value.error.stack}</div>
		</details>
	{/if}

</SimpleAlert>