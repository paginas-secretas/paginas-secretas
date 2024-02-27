import { isSingleValueWithMultipleValuesFormOutput, type FormSubmission } from '@components';
import { withVault } from '@core';
import { State, from } from './state';
import { createStore, setSuccess, type Store } from './store';
import type {
	AESGCMEncryptResult,
	AsymmetricCryptographicAlgorithm,
	AsymmetricKeyPair,
	Contact,
	ContactsList,
	EncryptedContactsInfo,
	LocalContactsList,
	PhoneNumber,
	SymmetricCryptographicAlgorithm,
	SymmetricKey
} from '@models';
import type { BrowserStorage } from '@data';
import type { ContactsManager } from '@http';

let cache: ReturnType<typeof createContactsListStore>;

export const ContactsListStore = function () {
	return cache ? cache : (cache = createContactsListStore());
};

type ContactsListState = {
	keyPair: AsymmetricKeyPair;
	symmetricKey: SymmetricKey;
	value: ContactsList;
};

function createContactsListStore() {
	const vault = withVault();

	const asymmetricCryptoAlgorithm = vault.asymmetricCrypto;
	const symmetricCryptoAlgorithm = vault.symmetricCrypto;
	const storage = vault.browserStorage;
	const manager = vault.contactsManager;

	const store = createStore<ContactsListState>();
	const subscribe = store.subscribe;

	return {
		subscribe,
		triggerCreateList: () =>
			triggerCreateContactsList(store, asymmetricCryptoAlgorithm, symmetricCryptoAlgorithm),
		triggerAddContact: (submission: FormSubmission) => triggerAddContact(store, submission),
		onContactsLoad: (
			keyPair: AsymmetricKeyPair,
			symmetricKey: SymmetricKey,
			contactsList: ContactsList
		) =>
			setSuccess(store, {
				keyPair: keyPair,
				symmetricKey: symmetricKey,
				value: contactsList
			}),
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
	asymmetricCryptoAlgorithm: AsymmetricCryptographicAlgorithm,
	symmetricCryptoAlgorithm: SymmetricCryptographicAlgorithm
) {
	const keyPair = await asymmetricCryptoAlgorithm.generate();
	const symmetricKey = await symmetricCryptoAlgorithm.generate();

	setSuccess(store, {
		keyPair: keyPair,
		symmetricKey: symmetricKey,
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
	asymmetricCryptoAlgorithm: AsymmetricCryptographicAlgorithm,
	symmetricCryptoAlgorithm: SymmetricCryptographicAlgorithm,
	manager: ContactsManager
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

	const encrypted = await symmetricCryptoAlgorithm.encrypt(symmetricKey, JSON.stringify(list));

	let encryptedList: string;
	let iv = '';
	if (typeof encrypted !== 'string') {
		const aesgcmEncryptResult: AESGCMEncryptResult = encrypted as AESGCMEncryptResult;
		encryptedList = aesgcmEncryptResult.data;
		iv = String.fromCodePoint(...new Uint8Array(aesgcmEncryptResult.iv));
	} else {
		encryptedList = encrypted as string;
	}

	const symmetricKeyEncrypted = await asymmetricCryptoAlgorithm.encrypt(
		keyPair.public,
		symmetricKey.toString()
	);

	const encryptedListBase64 = btoa(encryptedList);
	storage.store('encryptedList', encryptedListBase64);

	const encryptedContacts = <EncryptedContactsInfo>{
		key: btoa(symmetricKeyEncrypted),
		// needs to be encrypted
		iv: btoa(iv),
		contacts: encryptedListBase64
	};

	const partialEncryptedContactsList = await manager.add(btoa(JSON.stringify(encryptedContacts)));

	storage.store(
		`${partialEncryptedContactsList.ref}/${partialEncryptedContactsList.hash}`,
		JSON.stringify(<LocalContactsList>{
			asymmetric: {
				public: keyPair.public.toString(),
				private: keyPair.private.toString()
			},
			symmetric: symmetricKey.toString(),
			contactsList: list
		})
	);
}
