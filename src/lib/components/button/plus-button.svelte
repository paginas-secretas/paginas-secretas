<script lang="ts">
	export let onClick: () => void;
</script>

<div class="flex items-center" aria-hidden="true" on:click={onClick}>
	<svg width="24" height="24" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
		<path
			fill="currentColor"
			d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64z"
		/>
	</svg>
</div>
