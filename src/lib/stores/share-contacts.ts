import type { Form, FormSubmission } from '@components';
import { createStore, type Store } from './store';
import type { TranslationFunctions } from '@i18n';

type ShareContactsState = Form;

function createShareContactsForm(ll: TranslationFunctions) {
	const formLL = ll.form.shareContacts;

	return {
		id: 'share-contacts',
		name: formLL.name(),
		description: formLL.description(),
		required: [
			{
				id: 'public-key',
				description: formLL.descriptions.publicKey(),
				label: formLL.labels.publicKey(),
				placeholder: formLL.placeholders.publicKey(),
				type: 'raw'
			}
		],
		additional: [],
		control: {
			id: 'share-contacts-control',
			label: formLL.labels.control(),
			type: 'button'
		}
	} satisfies Form;
}

export function createShareContactsStore(ll: TranslationFunctions) {
	const form = createShareContactsForm(ll);
	const store = createStore<ShareContactsState>(form);
	const subscribe = store.subscribe;

	return {
		subscribe,
		submit: (submission: FormSubmission) => triggerShareContacts(store, submission)
	};
}

function triggerShareContacts(store: Store<ShareContactsState>, submission: FormSubmission) {
	console.log('triggerShareContacts');
	console.log(submission);
	console.log(store);
}
