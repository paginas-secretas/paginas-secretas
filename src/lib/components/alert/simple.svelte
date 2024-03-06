<script lang="ts">
	import { onMount } from 'svelte';
	import type { Alert } from '@components';

	export let value: Alert;

	const title = value.title;
	const subtitle = value.subtitle;
	const action = { label: value.action[0], callback: value.action[1] };

	const id = `alert-${new Date().valueOf()}`;

	let modalStateElement: HTMLInputElement;
	onMount(() => modalStateElement.click());
</script>

<input class="modal-state" type="checkbox" {id} bind:this={modalStateElement} />
<div class="modal">
	<label class="modal-overlay" for={id} />
	<div class="modal-content flex w-full flex-col gap-5 p-7">
		<label for={id} class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
		<div class="flex flex-col gap-2">
			<h2 class="text-center text-2xl font-semibold">{title}</h2>
			<p class="mx-auto max-w-xs text-center text-sm text-content2">
				{subtitle}
			</p>
		</div>

		<section>
			<slot />

			<div class="pt-5">
				<div class="justify-between">
					<button type="submit" class="btn btn-primary w-full" on:click={action.callback}
						>{action.label}</button
					>
				</div>
			</div>
		</section>
	</div>
</div>
