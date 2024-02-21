<script lang="ts">
	import { LL } from '@i18n';

	export let onClick: () => void;
</script>

<button class="btn btn-circle fixed bottom-10 right-8 h-16 w-16 bg-blue-600" on:click={onClick}>
	<span class="tooltip tooltip-top" data-tooltip={$LL.new()}>
		<svg width="32" height="32" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
			<path
				fill="currentColor"
				stroke-width="2"
				d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64z"
			/>
		</svg>
	</span>
</button>
