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
import { isSingleValueWithMultipleValuesFormOutput, type FormSubmission } from '@components';
import { State, from } from './state';
import { ContactsManager, ContactsManagerClient, type Manager } from '@http';

export const ContactsListStore = createContactsListStore(globalThis.window);

type ContactsListState = {
	keyPair: AsymmetricKeyPair;
	value: ContactsList;
};

function createContactsListStore(window: Window) {
	const cryptoAlgorithm = new RSAOAEPAlgorithm();
	const storage = new LocalBrowserStorage(window);
	const client = new ContactsManagerClient();
	const manager = new ContactsManager(client);
	const store = createStore<ContactsListState>();
	const subscribe = store.subscribe;

	return {
		subscribe,
		triggerCreateList: () => triggerCreateContactsList(store, storage, cryptoAlgorithm),
		triggerAddContact: (submission: FormSubmission) => triggerAddContact(store, submission),
		triggerStoreContactsList: () =>
			triggerStoreContactsList(store, storage, cryptoAlgorithm, manager)
	};
}

async function triggerCreateContactsList(
	store: Store<ContactsListState>,
	storage: BrowserStorage<string>,
	cryptoAlgorithm: CryptographicAlgorithm
) {
	const keyPair = await cryptoAlgorithm.generate();

	storage.store('public', keyPair.public.toString());
	storage.store('private', keyPair.private.toString());

	setSuccess(store, {
		keyPair: keyPair,
		value: []
	});
}

async function triggerAddContact(store: Store<ContactsListState>, submission: FormSubmission) {
	const arraySubmissions = [...submission.required, ...submission.additional];

	const birthday = arraySubmissions.find((entry) => entry[0].id == 'birthday')?.[1];
	const numbers = arraySubmissions.find((entry) => entry[0].id == 'phone-number')?.[1] ?? [];

	const contact = <Contact>{
		name: arraySubmissions.find((entry) => entry[0].id == 'name')?.[1],
		email: arraySubmissions.find((entry) => entry[0].id == 'email')?.[1],
		phoneNumbers: isSingleValueWithMultipleValuesFormOutput(numbers)
			? numbers.map((x) => <PhoneNumber>{ value: x.input, type: x.type })
			: [],
		birthDate: birthday ? new Date(birthday.toString()) : undefined,
		gender: arraySubmissions.find((entry) => entry[0].id == 'gender')?.[1]
	};

	store.update((s) => {
		s.value.value.push(contact);
		return from(s.value, State.success);
	});
}

async function triggerStoreContactsList(
	store: Store<ContactsListState>,
	storage: BrowserStorage<string>,
	cryptoAlgorithm: CryptographicAlgorithm,
	manager: Manager
) {
	let keyPair: AsymmetricKeyPair = <AsymmetricKeyPair>{};
	let list: ContactsList = [];
	store.update((s) => {
		keyPair = s.value.keyPair;
		list = s.value.value;
		return from(s.value, s.state);
	});

	const encryptedList = await cryptoAlgorithm.encrypt(keyPair.public, JSON.stringify(list));
	const encryptedListBase64 = btoa(encryptedList);
	storage.store('encryptedList', encryptedListBase64);
	manager.add(encryptedListBase64);
}
