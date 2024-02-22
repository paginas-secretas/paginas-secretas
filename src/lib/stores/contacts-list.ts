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
	SymmetricKey,
	type AESGCMEncryptResult,
	type EncryptedContactsInfo,
	type LocalContactsList
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

	const symmetricKey = await symmetricCryptoAlgorithm.generate();

	setSuccess(store, {
		keyPair: keyPair,
		symmetricKey: symmetricKey,
		value: [
			{
				name: 'Rute Santos',
				birthDate: new Date('1998/01/24'),
				email: 'rutesantos4@gmail.com',
				gender: 'Female',
				phoneNumbers: []
			},
			{
				name: 'João Freitas',
				birthDate: new Date('1997/07/22'),
				email: 'joao.mag.freitas@gmail.com',
				gender: 'Male',
				phoneNumbers: []
			},
			{
				name: 'Francisco Spínola',
				birthDate: new Date('2000/09/14'),
				email: 'fssecure@gmail.com',
				gender: 'Male',
				phoneNumbers: []
			},
			{
				name: 'Francisco Spínola',
				birthDate: new Date('2000/09/14'),
				email: 'fssecure@gmail.com',
				gender: 'Male',
				phoneNumbers: []
			},
			{
				name: 'Francisco Spínola',
				birthDate: new Date('2000/09/14'),
				email: 'fssecure@gmail.com',
				gender: 'Male',
				phoneNumbers: []
			},
			{
				name: 'Francisco Spínola',
				birthDate: new Date('2000/09/14'),
				email: 'fssecure@gmail.com',
				gender: 'Male',
				phoneNumbers: []
			},
			{
				name: 'Francisco Spínola',
				birthDate: new Date('2000/09/14'),
				email: 'fssecure@gmail.com',
				gender: 'Male',
				phoneNumbers: []
			},
			{
				name: 'Francisco Spínola',
				birthDate: new Date('2000/09/14'),
				email: 'fssecure@gmail.com',
				gender: 'Male',
				phoneNumbers: []
			},
			{
				name: 'João Freitas',
				birthDate: new Date('1997/07/22'),
				email: 'joao.mag.freitas@gmail.com',
				gender: 'Male',
				phoneNumbers: []
			},
			{
				name: 'João Freitas',
				birthDate: new Date('1997/07/22'),
				email: 'joao.mag.freitas@gmail.com',
				gender: 'Male',
				phoneNumbers: []
			},
			{
				name: 'João Freitas',
				birthDate: new Date('1997/07/22'),
				email: 'joao.mag.freitas@gmail.com',
				gender: 'Male',
				phoneNumbers: []
			},
			{
				name: 'João Freitas',
				birthDate: new Date('1997/07/22'),
				email: 'joao.mag.freitas@gmail.com',
				gender: 'Male',
				phoneNumbers: []
			},
			{
				name: 'João Freitas',
				birthDate: new Date('1997/07/22'),
				email: 'joao.mag.freitas@gmail.com',
				gender: 'Male',
				phoneNumbers: []
			},
			{
				name: 'João Freitas',
				birthDate: new Date('1997/07/22'),
				email: 'joao.mag.freitas@gmail.com',
				gender: 'Male',
				phoneNumbers: []
			},
			{
				name: 'João Freitas',
				birthDate: new Date('1997/07/22'),
				email: 'joao.mag.freitas@gmail.com',
				gender: 'Male',
				phoneNumbers: []
			},
			{
				name: 'João Freitas',
				birthDate: new Date('1997/07/22'),
				email: 'joao.mag.freitas@gmail.com',
				gender: 'Male',
				phoneNumbers: []
			},
			{
				name: 'João Freitas',
				birthDate: new Date('1997/07/22'),
				email: 'joao.mag.freitas@gmail.com',
				gender: 'Male',
				phoneNumbers: []
			},
			{
				name: 'João Freitas',
				birthDate: new Date('1997/07/22'),
				email: 'joao.mag.freitas@gmail.com',
				gender: 'Male',
				phoneNumbers: []
			},
			{
				name: 'João Freitas',
				birthDate: new Date('1997/07/22'),
				email: 'joao.mag.freitas@gmail.com',
				gender: 'Male',
				phoneNumbers: []
			},
			{
				name: 'João Freitas',
				birthDate: new Date('1997/07/22'),
				email: 'joao.mag.freitas@gmail.com',
				gender: 'Male',
				phoneNumbers: []
			},
			{
				name: 'João Freitas',
				birthDate: new Date('1997/07/22'),
				email: 'joao.mag.freitas@gmail.com',
				gender: 'Male',
				phoneNumbers: []
			}
		]
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
