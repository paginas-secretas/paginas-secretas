import { LocalBrowserStorage, type BrowserStorage } from '@data';
import {
	RSAOAEPAlgorithm,
	type ContactsList,
	type AsymmetricKeyPair,
	type Contact,
	type PhoneNumber,
	AESGCMAlgorithm,
	SymmetricCryptographicAlgorithm,
	AsymmetricCryptographicAlgorithm,
	SymmetricKey
} from '@models';
import { createStore, setSuccess, type Store } from './store';
import { isSingleValueWithMultipleValuesFormOutput, type FormSubmission } from '@components';
import { State, from } from './state';
import { ContactsManager, ContactsManagerClient, type Manager } from '@http';

export const ContactsListStore = createContactsListStore(globalThis.window);

type ContactsListState = {
	keyPair: AsymmetricKeyPair;
	symmetricKey: SymmetricKey;
	value: ContactsList;
};

function createContactsListStore(window: Window) {
	const asymmetricCryptoAlgorithm = new RSAOAEPAlgorithm();
	const symmetricCryptoAlgorithm = new AESGCMAlgorithm();
	const storage = new LocalBrowserStorage(window);
	const client = new ContactsManagerClient();
	const manager = new ContactsManager(client);
	const store = createStore<ContactsListState>();
	const subscribe = store.subscribe;

	return {
		subscribe,
		triggerCreateList: () =>
			triggerCreateContactsList(
				store,
				storage,
				asymmetricCryptoAlgorithm,
				symmetricCryptoAlgorithm
			),
		triggerAddContact: (submission: FormSubmission) => triggerAddContact(store, submission),
		triggerStoreContactsList: () =>
			triggerStoreContactsList(
				store,
				storage,
				asymmetricCryptoAlgorithm,
				symmetricCryptoAlgorithm,
				manager
			)
	};
}

async function triggerCreateContactsList(
	store: Store<ContactsListState>,
	storage: BrowserStorage<string>,
	asymmetricCryptoAlgorithm: AsymmetricCryptographicAlgorithm,
	symmetricCryptoAlgorithm: SymmetricCryptographicAlgorithm
) {
	const keyPair = await asymmetricCryptoAlgorithm.generate();

	storage.store('asymmetric-public', keyPair.public.toString());
	storage.store('asymmetric-private', keyPair.private.toString());

	const symmetricKey = await symmetricCryptoAlgorithm.generate();

	storage.store('symmetricKey-private', symmetricKey.toString());

	setSuccess(store, {
		keyPair: keyPair,
		symmetricKey: symmetricKey,
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
	asymmetricCryptoAlgorithm: AsymmetricCryptographicAlgorithm,
	symmetricCryptoAlgorithm: SymmetricCryptographicAlgorithm,
	manager: Manager
) {
	let keyPair: AsymmetricKeyPair = <AsymmetricKeyPair>{};
	let symmetricKey: SymmetricKey = <SymmetricKey>{};
	let list: ContactsList = [];
	store.update((s) => {
		keyPair = s.value.keyPair;
		symmetricKey = s.value.symmetricKey;
		list = s.value.value;
		return from(s.value, s.state);
	});

	const encryptedList = await symmetricCryptoAlgorithm.encrypt(symmetricKey, JSON.stringify(list));

	const symmetricKeyEncrypted = await asymmetricCryptoAlgorithm.encrypt(
		keyPair.public,
		symmetricKey.toString()
	);

	const encryptedListBase64 = btoa(encryptedList);
	storage.store('encryptedList', encryptedListBase64);

	const encryptedContacts = {
		key: btoa(symmetricKeyEncrypted),
		contacts: encryptedListBase64
	};

	manager.add(btoa(JSON.stringify(encryptedContacts)));
}
