import type { Form, FormInput, FormSubmission } from '@components';
import { isTypedOf } from '@core';

export function FormInitial(value: Form) {
	return {
		value: value,
		type: 'form-initial' as const
	};
}

export function FormInProgress(value: Form) {
	return {
		value: value,
		type: 'form-in-progress' as const
	};
}

export function FormFinish(value: Form, submission: FormSubmission) {
	return {
		value: value,
		submission: submission,
		type: 'form-finish' as const
	};
}

export function FormValidation(
	value: Form,
	required: Map<FormInput, string>,
	additional: Map<FormInput, string>
) {
	return {
		value: value,
		required: required,
		additional: additional,
		type: 'form-validation' as const
	};
}

export type FormInitial = ReturnType<typeof FormInitial>;
export type FormInProgress = ReturnType<typeof FormInProgress>;
export type FormFinish = ReturnType<typeof FormFinish>;
export type FormValidation = ReturnType<typeof FormValidation>;

export type FormState = FormInitial | FormInProgress | FormFinish | FormValidation;

export const isFormInProgress = (state: FormState): state is FormInProgress =>
	isTypedOf<FormInProgress>(state, 'form-in-progress');

export const isFormFinish = (state: FormState): state is FormFinish =>
	isTypedOf<FormFinish>(state, 'form-finish');
