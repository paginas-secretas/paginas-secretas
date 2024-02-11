import type { Form, FormSubmission } from '@components';
import { createStore, type Store } from './store';
import type { TranslationFunctions } from '@i18n';
import type { ContactsList } from '@models';

type NewContactState = Form | FormSubmission;

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
				description: formLL.descriptions.phoneNumber(),
				label: formLL.labels.phoneNumber(),
				placeholder: formLL.placeholders.phoneNumber(),
				type: 'phone-number'
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

export function createNewContactStore(ll: TranslationFunctions, contactsList: ContactsList) {
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
