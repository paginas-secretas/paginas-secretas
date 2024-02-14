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

export type FormInput = SingleValueFormInput | MultipleValuesFormInput;

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
	return input.type === 'list';
}

export function isButtonFormControl(control: FormControl) {
	return control.type === 'button';
}

export function initialSubmission(form: Form): FormSubmission {
	return {
		additional: new Map(form.additional.map((input) => [input, ''])),
		required: new Map(form.required.map((input) => [input, '']))
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
