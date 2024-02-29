import type { Form, FormSubmission } from '@components';
import { Reactor } from '@core';
import type { FormEvent, FormStarted, FormSubmitted } from './event';
import type { FormState, InvalidForm } from './state';

export abstract class FormReactor extends Reactor<FormEvent, FormState> {
	constructor(form: Form) {
		super({ value: form, status: 'started' });

		super.on<FormStarted>(
			(event, emit) => {
				emit({ value: this.state.value, status: 'in progress' });
			},
			(event) => Object.keys(event).length === 0
		);

		super.on<FormSubmitted>(
			(event, emit) => {
				const validation = this.validate(event);

				if (validation.additional.size + validation.required.size > 0) {
					emit({
						additional: validation.additional,
						required: validation.required,
						value: this.state.value,
						status: 'in progress'
					});
				} else {
					emit({ submission: event, value: this.state.value, status: 'finished' });
				}
			},
			(event) => 'required' in event
		);
	}

	protected abstract validate(form: FormSubmission): Pick<InvalidForm, 'required' | 'additional'>;
}
