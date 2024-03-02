import type { Form, FormSubmission } from '@components';
import { Reactor } from '@core';
import {
	type FormEvent,
	type FormStarted,
	type FormSubmitted,
	isFormStarted,
	isFormSubmitted
} from './event';
import { FormFinish, FormInitial, FormInProgress, type FormState, FormValidation } from './state';

export abstract class FormReactor extends Reactor<FormEvent, FormState> {
	protected constructor(form: Form) {
		super(FormInitial(form));

		super.on<FormStarted>((_, emit) => {
			emit(FormInProgress(this.state.value));
		}, isFormStarted);

		super.on<FormSubmitted>((event, emit) => {
			const validation = this.validate(event.value);

			if (validation.additional.size + validation.required.size > 0) {
				emit(FormValidation(this.state.value, validation.required, validation.additional));
			} else {
				emit(FormFinish(this.state.value, event.value));
			}
		}, isFormSubmitted);
	}

	protected abstract validate(
		form: FormSubmission
	): Pick<FormValidation, 'required' | 'additional'>;
}
