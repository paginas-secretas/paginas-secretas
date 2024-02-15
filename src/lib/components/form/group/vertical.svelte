<script lang="ts">
	import { PlusButton } from '@components';
	import {
		toHTMLInputTypeAttribute,
		type Form,
		type FormSubmission,
		initialSubmission,
		isMultipleValuesFormInput,
		isButtonFormControl,
		isSingleValueWithMultipleValuesFormInput,
		isSingleValueWithMultipleValuesFormOutput
	} from '../form';

	export let form: Form;
	export let onSubmit: (submission: FormSubmission) => void;

	const _submission = initialSubmission(form);
	$: submission = _submission;
</script>

<div class="form-group">
	{#each form.required as input}
		{@const values = submission.required.get(input) ?? []}

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
				{#if isSingleValueWithMultipleValuesFormOutput(values)}
					{#each values as value, idx}
						<div class="flex flex-row gap-2" id="grid-{input.id}">
							<div class="grid grid-cols-1 gap-4 sm:grid-cols-2" id="grid-{input.id}">
								<div>
									<select
										id="input-{input.types.id}-${idx}"
										placeholder={input.types.placeholder}
										value={value.type}
										class="select"
										required
										on:input={(event) => {
											value.type = event.currentTarget.value;
										}}
									>
										{#each input.types.values as value}
											<option>{value}</option>
										{/each}
									</select>
								</div>

								<div>
									<input
										id="input-{input.input.id}--${idx}"
										placeholder={input.input.placeholder}
										type={toHTMLInputTypeAttribute(input.input.type)}
										class="input"
										required
										on:input={(event) => {
											value.input = event.currentTarget.value;
										}}
									/>
								</div>
							</div>
							<PlusButton
								onClick={() => {
									submission.required = submission.required.set(
										input,
										values.concat({ input: '', type: '' })
									);
								}}
							/>
						</div>
					{/each}
				{/if}

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
			{@const values = submission.additional.get(input) ?? []}

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
					{#if isSingleValueWithMultipleValuesFormOutput(values)}
						{#each values as value, idx}
							<div class="flex flex-row gap-2" id="grid-{input.id}">
								<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
									<div>
										<select
											id="input-{input.types.id}-{idx}"
											placeholder={input.types.placeholder}
											value={value.type}
											class="select"
											on:input={(event) => {
												value.type = event.currentTarget.value;
											}}
										>
											{#each input.types.values as value}
												<option>{value}</option>
											{/each}
										</select>
									</div>

									<div>
										<input
											id="input-{input.input.id}-{idx}"
											placeholder={input.input.placeholder}
											type={toHTMLInputTypeAttribute(input.input.type)}
											class="input"
											on:input={(event) => {
												value.input = event.currentTarget.value;
											}}
										/>
									</div>
								</div>
								<PlusButton
									onClick={() => {
										submission.additional = submission.additional.set(
											input,
											values.concat({ input: '', type: '' })
										);
									}}
								/>
							</div>
						{/each}
					{/if}

					{#if input.input.description}
						<label class="form-label" for="input-{input.id}-0">
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
