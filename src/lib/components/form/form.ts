import type { HTMLInputTypeAttribute } from 'svelte/elements';

// input

export interface Form {
	id: string;
	name: string;
	description: string;
	required: FormInput[];
	additional: FormInput[];
	control: FormControl;
}

export type FormInput =
	| SingleValueFormInput
	| MultipleValuesFormInput
	| SingleValueWithMultipleValuesFormInput;

interface SingleValueFormInput {
	id: string;
	label: string;
	description: string | undefined;
	placeholder: string | undefined;
	type: FormInputType;
}

interface MultipleValuesFormInput extends SingleValueFormInput {
	type: 'list';
	values: string[];
}

interface SingleValueWithMultipleValuesFormInput {
	id: string;
	label: string;
	input: SingleValueFormInput;
	types: MultipleValuesFormInput;
}

export interface FormControl {
	id: string;
	label: string;
	type: FormControlType;
}

export type FormInputType =
	| 'raw'
	| 'email'
	| 'secret'
	| 'phone-number'
	| 'number'
	| 'date'
	| 'list'
	| 'types';
export type FormControlType = 'button';

// output

export interface FormSubmission {
	required: Map<FormInput, FormOutput>;
	additional: Map<FormInput, FormOutput>;
}

export type FormOutput = string;

export function isMultipleValuesFormInput(input: FormInput): input is MultipleValuesFormInput {
	return !isSingleValueWithMultipleValuesFormInput(input) && input.type === 'list';
}

export function isSingleValueWithMultipleValuesFormInput(
	input: FormInput
): input is SingleValueWithMultipleValuesFormInput {
	return 'types' in input;
}

export function isButtonFormControl(control: FormControl) {
	return control.type === 'button';
}

export function initialSubmission(form: Form): FormSubmission {
	const additional: FormInput[] = form.additional.flatMap((input) => {
		if (isSingleValueWithMultipleValuesFormInput(input)) {
			return [input.input, input.types];
		}
		return [input];
	});
	const required: FormInput[] = form.required.flatMap((input) => {
		if (isSingleValueWithMultipleValuesFormInput(input)) {
			return [input.input, input.types];
		}
		return [input];
	});
	return {
		additional: new Map(additional.map((input) => [input, ''])),
		required: new Map(required.map((input) => [input, '']))
	};
}

export function toHTMLInputTypeAttribute(type: FormInputType): HTMLInputTypeAttribute {
	switch (type) {
		case 'email':
			return 'email';
		case 'number':
			return 'number';
		case 'phone-number':
			return 'tel';
		case 'secret':
			return 'password';
		case 'date':
			return 'date';
		case 'raw':
		default:
			return 'text';
	}
}
