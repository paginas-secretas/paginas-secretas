<script lang="ts">
	import type { MessageAlert } from './alert';
	import { isValidURL } from '../util';
	import { CopyButton } from '../button';
	import { SimpleAlert } from '@components';

	export let value: MessageAlert;

	const isURL = isValidURL(value.message);
</script>

<SimpleAlert {value}>
	<div class="flex justify-end">
		<CopyButton onCopy={() => value.message} />
	</div>

	{#if isURL}
		<div class="break-all">
			<a class="link link-primary" href={value.message}>{value.message}</a>
		</div>
	{:else}
		<div class="break-words whitespace-pre-wrap">{value.message}</div>
	{/if}
</SimpleAlert>
