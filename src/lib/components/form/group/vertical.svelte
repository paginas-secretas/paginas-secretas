<script lang="ts">
	import { PlusButton } from '@components';
	import {
		toHTMLInputTypeAttribute,
		type Form,
		type FormSubmission,
		initialSubmission,
		isMultipleValuesFormInput,
		isButtonFormControl,
		isSingleValueWithMultipleValuesFormInput
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
					id="input-{input.id}"
					placeholder={input.placeholder}
					value={input.placeholder}
					class="select max-w-full"
					required
					on:input={(event) => {
						submission.additional.set(input, event.currentTarget.value);
					}}
				>
					{#each input.values as value}
						<option>{value}</option>
					{/each}
				</select>
				{#if input.description}
					<label class="form-label" for="input-{input.id}">
						<span class="form-label-alt">{input.description}</span>
					</label>
				{/if}
			{:else if isSingleValueWithMultipleValuesFormInput(input)}
			<div class="flex flex-row gap-2" id="grid-{input.id}">
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2" id="grid-{input.id}">
					<div>
						<select
							id="input-{input.types.id}"
							placeholder={input.types.placeholder}
							value={input.types.placeholder}
							class="select"
							required
							on:input={(event) => {
								if (isSingleValueWithMultipleValuesFormInput(input)) {
									submission.additional.set(input.types, event.currentTarget.value);
								}
							}}
						>
							{#each input.types.values as value}
								<option>{value}</option>
							{/each}
						</select>
					</div>

					<div>
						<input
							id="input-{input.input.id}"
							placeholder={input.input.placeholder}
							type={toHTMLInputTypeAttribute(input.input.type)}
							class="input"
							required
							on:input={(event) => {
								if (isSingleValueWithMultipleValuesFormInput(input)) {
									submission.additional.set(input.input, event.currentTarget.value);
								}
							}}
						/>
					</div>
				</div>
				<PlusButton onClick={() => console.log('clicked add')} />
			</div>
			{:else}
				<input
					id="input-{input.id}"
					placeholder={input.placeholder}
					type={toHTMLInputTypeAttribute(input.type)}
					class="input max-w-full"
					required
					on:input={(event) => submission.required.set(input, event.currentTarget.value)}
				/>
				{#if input.description}
					<label class="form-label" for="input-{input.id}">
						<span class="form-label-alt">{input.description}</span>
					</label>
				{/if}
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
						id="input-{input.id}"
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
					{#if input.description}
						<label class="form-label" for="input-{input.id}">
							<span class="form-label-alt">{input.description}</span>
						</label>
					{/if}
				{:else if isSingleValueWithMultipleValuesFormInput(input)}
					<div class="flex flex-row gap-2" id="grid-{input.id}">
						<div class="grid grid-cols-1 gap-4 sm:grid-cols-2" id="grid-{input.id}">
							<div>
								<select
									id="input-{input.types.id}"
									placeholder={input.types.placeholder}
									value={input.types.placeholder}
									class="select"
									on:input={(event) => {
										if (isSingleValueWithMultipleValuesFormInput(input)) {
											submission.additional.set(input.types, event.currentTarget.value);
										}
									}}
								>
									{#each input.types.values as value}
										<option>{value}</option>
									{/each}
								</select>
							</div>

							<div>
								<input
									id="input-{input.input.id}"
									placeholder={input.input.placeholder}
									type={toHTMLInputTypeAttribute(input.input.type)}
									class="input"
									on:input={(event) => {
										if (isSingleValueWithMultipleValuesFormInput(input)) {
											submission.additional.set(input.input, event.currentTarget.value);
										}
									}}
								/>
							</div>
						</div>
						<PlusButton onClick={() => console.log('clicked add')} />
					</div>
					{#if input.input.description}
						<label class="form-label" for="input-{input.input.id}">
							<span class="form-label-alt">{input.input.description}</span>
						</label>
					{/if}
				{:else}
					<input
						id="input-{input.id}"
						placeholder={input.placeholder}
						type={toHTMLInputTypeAttribute(input.type)}
						class="input max-w-full"
						on:input={(event) => submission.additional.set(input, event.currentTarget.value)}
					/>
					{#if input.description}
						<label class="form-label" for="input-{input.id}">
							<span class="form-label-alt">{input.description}</span>
						</label>
					{/if}
				{/if}
			</div>
		{/each}
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
