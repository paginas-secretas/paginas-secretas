import type { Form, FormSubmission } from '@components';
import { createStore, type Store } from './store';
import type { TranslationFunctions } from '@i18n';

type NewContactState = Form;

function createNewContactForm(ll: TranslationFunctions) {
	const formLL = ll.form.newContact;

	return {
		id: 'new-contact',
		name: formLL.name(),
		description: formLL.description(),
		required: [
			{
				id: 'name',
				description: formLL.descriptions.name(),
				label: formLL.labels.name(),
				placeholder: formLL.placeholders.name(),
				type: 'raw'
			},
			{
				id: 'email',
				description: formLL.descriptions.email(),
				label: formLL.labels.email(),
				placeholder: formLL.placeholders.email(),
				type: 'email'
			}
		],
		additional: [
			{
				id: 'phone-number',
				label: formLL.labels.phoneNumber(),
				count: 1,
				input: {
					id: 'phone-number',
					description: formLL.descriptions.phoneNumber(),
					label: formLL.labels.phoneNumber(),
					placeholder: formLL.placeholders.phoneNumber(),
					type: 'phone-number'
				},
				types: {
					id: 'phone-number-type',
					description: formLL.descriptions.phoneNumberType(),
					label: formLL.labels.phoneNumberType(),
					placeholder: formLL.placeholders.phoneNumberType(),
					type: 'list',
					values: Object.values(formLL.values.phoneNumberType).map((ls) => ls())
				}
			},
			{
				id: 'birthday',
				description: formLL.descriptions.birthday(),
				label: formLL.labels.birthday(),
				placeholder: formLL.placeholders.birthday(),
				type: 'date'
			},
			{
				id: 'gender',
				description: formLL.descriptions.gender(),
				label: formLL.labels.gender(),
				placeholder: formLL.placeholders.gender(),
				type: 'list',
				values: Object.values(formLL.values.gender).map((ls) => ls())
			}
		],
		control: {
			id: 'new-contact-control',
			label: formLL.labels.control(),
			type: 'button'
		}
	} satisfies Form;
}

export function createNewContactStore(ll: TranslationFunctions) {
	const form = createNewContactForm(ll);
	const store = createStore<NewContactState>(form);
	const subscribe = store.subscribe;

	return {
		subscribe,
		submit: (submission: FormSubmission) => triggerSaveContact(store, submission)
	};
}

function triggerSaveContact(store: Store<NewContactState>, submission: FormSubmission) {
	console.log();
}
