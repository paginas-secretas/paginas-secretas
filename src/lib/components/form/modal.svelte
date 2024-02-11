<script lang="ts">
	import type { Form, FormSubmission } from './form';
	import { VerticalFormGroup } from './group';

	export let form: Form;
	export let id: string;
	const onSubmit = (submission: FormSubmission) =>
		console.log(
			JSON.stringify(Array.from([...submission.additional, ...submission.required]), null, 2)
		);
</script>

<input class="modal-state" {id} type="checkbox" />
<div class="modal">
	<label class="modal-overlay" for={id} />
	<div class="modal-content flex w-full flex-col gap-5 p-7">
		<label for={id} class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
		<div class="flex flex-col gap-2">
			<h2 class="text-center text-2xl font-semibold">{form.name}</h2>
			<p class="mx-auto max-w-xs text-sm text-content2">
				{form.description}
			</p>
		</div>

		<section>
			<form id={form.id} on:submit={() => console.log('é no modal')} action=".">
				<VerticalFormGroup {form} {onSubmit} />
			</form>
		</section>
	</div>
</div>
