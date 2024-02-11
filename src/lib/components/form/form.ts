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

export interface FormInput {
	id: string;
	label: string;
	description: string | undefined;
	placeholder: string | undefined;
	type: FormInputType;
}

export interface FormControl {
	id: string;
	label: string;
	type: FormControlType;
}

// output

export interface FormSubmission {
	required: Map<FormInput, FormOutput>;
	additional: Map<FormInput, FormOutput>;
}

export type FormOutput = string;

export type FormInputType = 'raw' | 'email' | 'secret' | 'phone-number' | 'number';
export type FormControlType = 'button';

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
		case 'raw':
			return 'text';
		case 'secret':
			return 'password';
	}
}
