<script lang="ts">
	import { PlusButton, MinusButton } from '@components';
	import {
		toHTMLInputTypeAttribute,
		type Form,
		type FormSubmission,
		initialSubmission,
		isMultipleValuesFormInput,
		isButtonFormControl,
		isSingleValueWithMultipleValuesFormInput,
		isSingleValueWithMultipleValuesFormOutput,
		initialSubmissionSingleValueWithMultipleValuesFormOutput,
		isAreaInputType
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
										id="input-{input.types.id}-${value.id}"
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
									{#if isAreaInputType(input.input.type)}
										<textarea
											id="input-{input.input.id}-${value.id}"
											placeholder={input.input.placeholder}
											class="textarea"
											rows="5"
											required
											on:input={(event) => {
												value.input = event.currentTarget.value;
											}}
										/>
									{:else}
										<input
											id="input-{input.input.id}-${value.id}"
											placeholder={input.input.placeholder}
											type={toHTMLInputTypeAttribute(input.input.type)}
											class="input"
											required
											on:input={(event) => {
												value.input = event.currentTarget.value;
											}}
										/>
									{/if}
								</div>
							</div>
							{#if values.length > 1 && idx + 1 != values.length}
								<MinusButton
									onClick={() => {
										submission.additional = submission.additional.set(
											input,
											values.filter((x) => x.id != value.id)
										);
									}}
								/>
							{:else}
								<PlusButton
									onClick={() => {
										submission.additional = submission.additional.set(
											input,
											values.concat(initialSubmissionSingleValueWithMultipleValuesFormOutput())
										);
									}}
								/>
							{/if}
						</div>
					{/each}
				{/if}

				{#if input.input.description}
					<label class="form-label" for="input-{input.input.id}">
						<span class="form-label-alt">{input.input.description}</span>
					</label>
				{/if}
			{:else}
				{#if isAreaInputType(input.type)}
					<textarea
						id="input-{input.id}"
						placeholder={input.placeholder}
						class="textarea max-w-full"
						rows="5"
						required
						on:input={(event) => submission.required.set(input, event.currentTarget.value)}
					/>
				{:else}
					<input
						id="input-{input.id}"
						placeholder={input.placeholder}
						type={toHTMLInputTypeAttribute(input.type)}
						class="input max-w-full"
						required
						on:input={(event) => submission.required.set(input, event.currentTarget.value)}
					/>
				{/if}
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
				<div class="form-label">{input.label}</div>
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
											id="input-{input.types.id}-{value.id}"
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
										{#if isAreaInputType(input.input.type)}
											<textarea
												id="input-{input.input.id}-{value.id}"
												placeholder={input.input.placeholder}
												class="textarea max-w-full"
												rows="5"
												required
												on:input={(event) => {
													value.input = event.currentTarget.value;
												}}
											/>
										{:else}
											<input
												id="input-{input.input.id}-{value.id}"
												placeholder={input.input.placeholder}
												type={toHTMLInputTypeAttribute(input.input.type)}
												value={value.input}
												class="input"
												on:input={(event) => {
													value.input = event.currentTarget.value;
												}}
											/>
										{/if}
									</div>
								</div>
								{#if values.length > 1 && idx + 1 != values.length}
									<MinusButton
										onClick={() => {
											submission.additional = submission.additional.set(
												input,
												values.filter((x) => x.id != value.id)
											);
										}}
									/>
								{:else}
									<PlusButton
										onClick={() => {
											submission.additional = submission.additional.set(
												input,
												values.concat(initialSubmissionSingleValueWithMultipleValuesFormOutput())
											);
										}}
									/>
								{/if}
							</div>
						{/each}
					{/if}

					{#if input.input.description}
						<div class="form-label">
							<span class="form-label-alt">{input.input.description}</span>
						</div>
					{/if}
				{:else}
					{#if isAreaInputType(input.type)}
						<textarea
							id="input-{input.id}"
							placeholder={input.placeholder}
							class="textarea max-w-full"
							rows="5"
							on:input={(event) => submission.additional.set(input, event.currentTarget.value)}
						/>
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
