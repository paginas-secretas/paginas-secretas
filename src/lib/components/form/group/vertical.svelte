<script lang="ts">
	import { type Form, type FormSubmission, initialSubmission, isButtonFormControl } from '../form';
	import FormSection from './form-section.svelte';

	export let form: Form;
	export let onSubmit: (submission: FormSubmission) => void;

	const _submission = initialSubmission(form);
	$: submission = _submission;
</script>

<div class="form-group">
	<FormSection
		formId={form.id}
		formInputs={form.required}
		isRequired={true}
		submissionValues={submission.required}
	/>

	{#if form.required.length > 0 && form.additional.length > 0}
		<div class="divider divider-horizontal">Optional</div>
		<FormSection
			formId={form.id}
			formInputs={form.additional}
			isRequired={false}
			submissionValues={submission.additional}
		/>
	{/if}

	<div class="form-field pt-5">
		<div class="form-control justify-between">
			{#if isButtonFormControl(form.control)}
				<button
					id={form.control.id}
					type="submit"
					class="btn btn-primary w-full"
					form={form.id}
					on:click={() => onSubmit(submission)}>{form.control.label}</button
				>
			{/if}
		</div>
	</div>
</div>
