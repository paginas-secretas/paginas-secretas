<script lang="ts">
	import { LL } from '@i18n';

	export let onDownload: () => { name: string; content: string; type: 'text/plain' };

	let downloadElement: HTMLAnchorElement;

	$: downloaded = false;
	$: tooltip = downloaded ? $LL.downloadedAction() : $LL.downloadAction();
</script>

<button
	on:click={() => {
		const file = onDownload();
		const url = window.URL.createObjectURL(new Blob([file.content], { type: file.type }));

		downloadElement.download = file.name;
		downloadElement.href = url;
		downloadElement.click();

		window.URL.revokeObjectURL(url);
		downloaded = true;
	}}
>
	<span class="tooltip-primary tooltip tooltip-left" data-tooltip={tooltip}>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
			<path
				fill="currentColor"
				d="m9 9.114l1.85-1.943a.52.52 0 0 1 .77 0c.214.228.214.6 0 .829l-1.95 2.05a1.552 1.552 0 0 1-2.31 0L5.41 8a.617.617 0 0 1 0-.829a.52.52 0 0 1 .77 0L8 9.082V.556C8 .249 8.224 0 8.5 0s.5.249.5.556z"
			/>
			<path
				fill="currentColor"
				d="M16 13.006V10h-1v3.006a.995.995 0 0 1-.994.994H3.01a.995.995 0 0 1-.994-.994V10h-1v3.006c0 1.1.892 1.994 1.994 1.994h10.996c1.1 0 1.994-.893 1.994-1.994"
			/>
		</svg>
	</span>

	<a href="#download" download hidden bind:this={downloadElement}>{$LL.downloadAction}...</a>
</button>
