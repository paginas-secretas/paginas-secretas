<script lang="ts">
	export let values: string[];
	export let onClick: (value: string) => void;

	$: active = false;
</script>

<div class="flex items-center" on:click={() => (active = !active)} aria-hidden="true">
	<div>
		<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
			<path
				fill="currentColor"
				fill-rule="evenodd"
				d="M10.5 5A1.5 1.5 0 0 1 12 3.5h.01a1.5 1.5 0 0 1 1.5 1.5v.01a1.5 1.5 0 0 1-1.5 1.5H12a1.5 1.5 0 0 1-1.5-1.5V5Zm0 7a1.5 1.5 0 0 1 1.5-1.5h.01a1.5 1.5 0 0 1 1.5 1.5v.01a1.5 1.5 0 0 1-1.5 1.5H12a1.5 1.5 0 0 1-1.5-1.5V12Zm1.5 5.5a1.5 1.5 0 0 0-1.5 1.5v.01a1.5 1.5 0 0 0 1.5 1.5h.01a1.5 1.5 0 0 0 1.5-1.5V19a1.5 1.5 0 0 0-1.5-1.5H12Z"
				clip-rule="evenodd"
			/>
		</svg>
	</div>
</div>

{#if active}
	<div class="dropdown dropdown-open">
		<div class="dropdown-menu">
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
					{value}
				</div>
			{/each}
		</div>
	</div>
{/if}
