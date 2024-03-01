<script lang="ts">
	import { PlusButton, MinusButton } from '@components';
	import {
		toHTMLInputTypeAttribute,
		isMultipleValuesFormInput,
		isSingleValueWithMultipleValuesFormInput,
		isSingleValueWithMultipleValuesFormOutput,
		initialSubmissionSingleValueWithMultipleValuesFormOutput,
		isAreaInputType,
		type FormInput,
		type FormOutput
	} from '../form';

	export let formId: string;
	export let formInputs: FormInput[];
	export let isRequired: boolean;
	export let submissionValues: Map<FormInput, FormOutput>;
</script>

{#each formInputs as input}
	{@const values = submissionValues.get(input) ?? []}

	<div id="{formId}-{input.id}" class="form-field">
		<label class="form-label" for="input-{input.id}">{input.label}</label>
		{#if isMultipleValuesFormInput(input)}
			<select
				id="input-{input.id}"
				placeholder={input.placeholder}
				value={input.placeholder}
				class="select max-w-full"
				required={isRequired}
				on:input={(event) => {
					submissionValues.set(input, event.currentTarget.value);
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
									required={isRequired}
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
										required={isRequired}
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
										required={isRequired}
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
									submissionValues = submissionValues.set(
										input,
										values.filter((x) => x.id != value.id)
									);
								}}
							/>
						{:else}
							<PlusButton
								onClick={() => {
									submissionValues = submissionValues.set(
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
					required={isRequired}
					on:input={(event) => submissionValues.set(input, event.currentTarget.value)}
				/>
			{:else}
				<input
					id="input-{input.id}"
					placeholder={input.placeholder}
					type={toHTMLInputTypeAttribute(input.type)}
					class="input max-w-full"
					required={isRequired}
					on:input={(event) => submissionValues.set(input, event.currentTarget.value)}
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
