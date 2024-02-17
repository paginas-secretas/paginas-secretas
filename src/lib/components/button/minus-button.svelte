<script lang="ts">
	export let onClick: () => void;
</script>

<div class="flex items-center" aria-hidden="true" on:click={onClick}>
	<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
		<rect width="10" height="1.5" x="3" y="7.25" fill="currentColor" rx=".5" />
	</svg>
</div>
