import { LocalBrowserStorage, type BrowserStorage } from '@data';
import {
	RSAOAEPAlgorithm,
	type CryptographicAlgorithm,
	type ContactsList,
	type AsymmetricKeyPair,
	type Contact,
	type PhoneNumber
} from '../models';
import { createStore, setSuccess, type Store } from './store';
import type { FormSubmission } from '@components';
import { State, from } from './state';

export const ContactsListStore = createContactsListStore(globalThis.window);

type ContactsListState = {
	keyPair: AsymmetricKeyPair;
	value: ContactsList;
};

function createContactsListStore(window: Window) {
	const cryptoAlgorithm = new RSAOAEPAlgorithm();
	const storage = new LocalBrowserStorage(window);

	const store = createStore<ContactsListState>();
	const subscribe = store.subscribe;

	return {
		subscribe,
		triggerCreateList: () => triggerCreateContactsList(store, storage, cryptoAlgorithm),
		triggerStoreList: (submission: FormSubmission) =>
			triggerStoreContactsList(store, storage, submission)
	};
}

async function triggerCreateContactsList(
	store: Store<ContactsListState>,
	storage: BrowserStorage<string>,
	cryptoAlgorithm: CryptographicAlgorithm
) {
	const keyPair = await cryptoAlgorithm.generate();
	console.log('key-pair generated');

	setSuccess(store, {
		keyPair: keyPair,
		value: []
	});
}

async function triggerStoreContactsList(
	store: Store<ContactsListState>,
	storage: BrowserStorage<string>,
	submission: FormSubmission
) {
	const arraySubmissions = [...submission.required, ...submission.additional];

	const contact = <Contact>{
		name: arraySubmissions.find((entry) => entry[0].id == 'name')?.[1],
		email: arraySubmissions.find((entry) => entry[0].id == 'email')?.[1],
		phoneNumber: <PhoneNumber>{
			value: arraySubmissions.find((entry) => entry[0].id == 'phone-number')?.[1],
			type: arraySubmissions.find((entry) => entry[0].id == 'phone-number-type')?.[1]
		},
		birthDate: new Date(arraySubmissions.find((entry) => entry[0].id == 'birth-date')?.[1] ?? 0),
		gender: arraySubmissions.find((entry) => entry[0].id == 'gender')?.[1]
	};

	store.update((s) => {
		s.value.value.push(contact);
		return from(s.value, State.success);
	});
}
