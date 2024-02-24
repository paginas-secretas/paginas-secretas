<script lang="ts">
	import { onMount } from 'svelte';
	import type { Alert } from './alert';
	import { isValidURL } from '../util';

	export let value: Alert;
	const id = `alert-${new Date().getMilliseconds()}`;
	const isURL = isValidURL(value.message);

	let modalStateElement: HTMLInputElement;
	onMount(() => modalStateElement.click());
</script>

<input class="modal-state" type="checkbox" {id} bind:this={modalStateElement} />
<div class="modal">
	<label class="modal-overlay" for={id} />
	<div class="modal-content flex w-full flex-col gap-5 p-7">
		<label for={id} class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
		<div class="flex flex-col gap-2">
			<h2 class="text-center text-2xl font-semibold">{value.title}</h2>
			<p class="mx-auto max-w-xs text-center text-sm text-content2">
				{value.subtitle}
			</p>
		</div>

		<section>
			{#if isURL}
				<div class="text-wrap break-words">
					<a class="link link-primary" href={value.message}>{value.message}</a>
				</div>
			{:else}
				<div class="text-wrap break-words">{value.message}</div>
			{/if}

			<div class="pt-5">
				<div class="justify-between">
					<button type="submit" class="btn btn-primary w-full" on:click={value.action[1]}
						>{value.action[0]}</button
					>
				</div>
			</div>
		</section>
	</div>
</div>
