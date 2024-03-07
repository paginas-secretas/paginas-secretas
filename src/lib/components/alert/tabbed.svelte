<script lang="ts">
	import type { TabbedAlert } from './alert';
	import { CopyButton, DownloadButton } from '../button';
	import { SimpleAlert } from '@components';

	export let value: TabbedAlert;

	$: active = value.tabs[0];
</script>

<SimpleAlert {value}>
	<div class="flex justify-end gap-2">
		<CopyButton onCopy={() => active.value} />
		<DownloadButton
			onDownload={() => {
				return { name: active.tab, content: active.value, type: 'text/plain' };
			}}
		/>
	</div>

	<div class="flex flex-col items-center gap-4">
		<div class="tabs">
			{#each value.tabs as tab}
				<div
					class="tab px-6 {active === tab ? 'tab-active tab-underline' : ''}"
					on:click={() => (active = tab)}
					aria-hidden="true"
				>
					{tab.tab}
				</div>
			{/each}
		</div>

		<div class="break-all">
			<div class="break-words whitespace-pre-wrap">{active.value}</div>
		</div>
	</div>
</SimpleAlert>
