<script lang="ts">
	import type { ContactsListId } from '@models';

	export let values: ContactsListId[];
	export let onClick: (value: ContactsListId) => void;
	export let disabled = false;

	let container: HTMLElement;

	$: active = false;
</script>

<svelte:window
	on:click={(e) => {
		if (e.target instanceof Node && container.contains(e.target) == false) {
			active = false;
		}
	}}
/>

<div
	bind:this={container}
	class="flex items-center {disabled ? 'cursor-default' : 'cursor-pointer'}"
	on:click={() => (active = !active && !disabled)}
	aria-hidden="true"
>
	<div>
		<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
			<path fill="currentColor" d="m7 10l5 5l5-5z" />
		</svg>
	</div>
</div>

{#if active}
	<div class="dropdown dropdown-open">
		<div class="dropdown-menu dropdown-menu-down-center">
			{#each values as value}
				<div
					tabindex="-1"
					class="dropdown-item text-sm"
					on:click={() => {
						onClick(value);
						active = false;
					}}
					aria-hidden
				>
					{value.name}
				</div>
			{/each}
		</div>
	</div>
{/if}
