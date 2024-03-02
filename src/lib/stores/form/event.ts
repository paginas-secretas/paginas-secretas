import type { FormSubmission } from '@components';
import { isTypedOf } from '@core';

export function FormStarted() {
	return {
		type: 'form-started' as const
	};
}

export function FormSubmitted(value: FormSubmission) {
	return {
		value: value,
		type: 'form-submitted' as const
	};
}

export type FormStarted = ReturnType<typeof FormStarted>;
export type FormSubmitted = ReturnType<typeof FormSubmitted>;

export type FormEvent = FormStarted | FormSubmitted;

export const isFormStarted = (event: FormEvent) => isTypedOf<FormStarted>(event, 'form-started');
export const isFormSubmitted = (event: FormEvent) =>
	isTypedOf<FormSubmitted>(event, 'form-submitted');
