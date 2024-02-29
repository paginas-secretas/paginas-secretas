import type { FormSubmission } from '@components';

export type FormStarted = {};
export type FormSubmitted = FormSubmission;

export type FormEvent = FormStarted | FormSubmitted;
