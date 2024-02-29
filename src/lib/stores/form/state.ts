import type { Form, FormInput, FormSubmission } from '@components';

export type InitialForm = { value: Form; status: 'started' | 'in progress' | 'finished' };

export type InvalidForm = {
	required: Map<FormInput, string>;
	additional: Map<FormInput, string>;
} & InitialForm;

export type ValidForm = {
	submission: FormSubmission;
} & InitialForm;

export type FormState = InitialForm | InvalidForm | ValidForm;
