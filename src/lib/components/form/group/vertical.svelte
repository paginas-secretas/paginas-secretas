<script lang="ts">
	import {
		toHTMLInputTypeAttribute,
		type Form,
		type FormSubmission,
		initialSubmission,
		isMultipleValuesFormInput
	} from '../form';

	export let form: Form;
	export let onSubmit: (submission: FormSubmission) => void;

	const submission = initialSubmission(form);
</script>

<div class="form-group">
	{#each form.required as input}
		<div id="{form.id}-{input.id}" class="form-field">
			<label class="form-label" for="input-{input.id}">{input.label}</label>
			{#if isMultipleValuesFormInput(input)}
				<select
					id="select-{input.id}"
					placeholder={input.placeholder}
					value={input.placeholder}
					class="select max-w-full"
					on:input={(event) => {
						submission.additional.set(input, event.currentTarget.value);
					}}
				>
					{#each input.values as value}
						<option>{value}</option>
					{/each}
				</select>
			{:else}
				<input
					id="input-{input.id}"
					placeholder={input.placeholder}
					type={toHTMLInputTypeAttribute(input.type)}
					class="input max-w-full"
					on:input={(event) => submission.required.set(input, event.currentTarget.value)}
				/>
			{/if}
			{#if input.description}
				<label class="form-label" for="input-{input.id}">
					<span class="form-label-alt">{input.description}</span>
				</label>
			{/if}
		</div>
	{/each}
	{#if form.required.length > 0 && form.additional.length > 0}
		<div class="divider divider-horizontal">Optional</div>
		{#each form.additional as input}
			<div id="{form.id}-{input.id}" class="form-field">
				<label class="form-label" for="input-{input.id}">{input.label}</label>
				{#if isMultipleValuesFormInput(input)}
					<select
						id="select-{input.id}"
						placeholder={input.placeholder}
						value={input.placeholder}
						class="select max-w-full"
						on:input={(event) => {
							submission.additional.set(input, event.currentTarget.value);
						}}
					>
						{#each input.values as value}
							<option>{value}</option>
						{/each}
					</select>
				{:else}
					<input
						id="input-{input.id}"
						placeholder={input.placeholder}
						type={toHTMLInputTypeAttribute(input.type)}
						class="input max-w-full"
						on:input={(event) => submission.additional.set(input, event.currentTarget.value)}
					/>
				{/if}
				{#if input.description}
					<label class="form-label" for="input-{input.id}">
						<span class="form-label-alt">{input.description}</span>
					</label>
				{/if}
			</div>
		{/each}
	{/if}

	<div class="form-field pt-5">
		<div class="form-control justify-between">
			{#if form.control.type === 'button'}
				<button
					on:click={() => onSubmit(submission)}
					id={form.control.id}
					type="button"
					class="btn btn-primary w-full">{form.control.label}</button
				>
			{/if}
		</div>
	</div>
</div>
