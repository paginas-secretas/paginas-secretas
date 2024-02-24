<script lang="ts">
	import { onMount } from 'svelte';
	import type { Form, FormSubmission } from './form';
	import { VerticalFormGroup } from './group';

	export let form: Form;
	export let onSubmit: (submission: FormSubmission) => void;

	const id = `modal-${form.id}`;

	let submission: FormSubmission;
	let modalStateElement: HTMLInputElement;
	onMount(() => modalStateElement.click());
</script>

<input class="modal-state" type="checkbox" {id} bind:this={modalStateElement} />
<div class="modal">
	<label class="modal-overlay" for={id} />
	<div class="modal-content flex w-full flex-col gap-5 p-7">
		<label for={id} class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
		<div class="flex flex-col gap-2">
			<h2 class="text-center text-2xl font-semibold">{form.name}</h2>
			<p class="mx-auto max-w-xs text-center text-sm text-content2">
				{form.description}
			</p>
		</div>

		<section>
			<form id={form.id} on:submit={() => onSubmit(submission)}>
				<VerticalFormGroup {form} onSubmit={(formSubmission) => (submission = formSubmission)} />
			</form>
		</section>
	</div>
</div>
