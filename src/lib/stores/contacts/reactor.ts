import { isSingleValueWithMultipleValuesFormOutput, type FormSubmission } from '@components';
import { Reactor, withVault } from '@core';
import {
	AsymmetricKey,
	toEncryptedContactsInfo,
	type AsymmetricKeyPair,
	type Contact,
	type ContactsList,
	type EncryptedContactsInfo,
	type EncryptedContactsList,
	type LocalContactsList,
	type PhoneNumber,
	SymmetricKey,
	arrayBuffer
} from '@models';
import type {
	AddContact,
	ContactsEvent,
	DecryptContacts,
	NewContactsList,
	SaveContacts,
	ShareContacts
} from './event';
import type { ContactsState } from './state';

export class ContactsReactor extends Reactor<ContactsEvent, ContactsState> {
	private symmetricKey!: SymmetricKey;
	private asymmetricKey!: AsymmetricKeyPair;

	constructor() {
		super({ value: [] });

		super.on<AddContact>(
			(event, emit) => {
				const contact = submissionToContact(event);

				emit({ value: [...this.state.value, contact] });
			},
			(event) => 'required' in event
		);

		super.on<NewContactsList>(
			async (event, emit) => {
				const vault = withVault();

				if (!event.value) {
					this.asymmetricKey = await vault.asymmetricCrypto.generate();
					this.symmetricKey = await vault.symmetricCrypto.generate();

					emit({ value: [] });
				} else {
					this.asymmetricKey = event.value.asymmetricKeyPair;
					this.symmetricKey = event.value.symmetricKey;

					emit({ value: event.value.contacts });
				}
			},
			(event) => 'value' in event
		);

		super.on<SaveContacts>(
			async (_, emit) => {
				await triggerStoreContactsList(this.state.value, this.symmetricKey, this.asymmetricKey);

				emit({ value: this.state.value });
			},
			(event) => Object.keys(event).length === 0
		);

		super.on<ShareContacts>(
			async (event, emit) => {
				const vault = withVault();

				const publicKey = submissionToPublicKey(event);
				const symmetricKey = await vault.symmetricCrypto.generate();
				const result = await storeContactsListInManager(symmetricKey, publicKey, this.state.value);

				emit({
					value: this.state.value,
					url: new URL(`${window.location.origin}/${result.ref}/${result.hash}`)
				});
			},
			(event) => 'required' in event && event.required.size === 1
		);

		super.on<DecryptContacts>(
			async (event, emit) => {
				const vault = withVault();

				const privateKey = submissionToPrivateKey(event.submission);
				const result = await vault.contactsManager.fetch(event.ref, event.hash);
				const decrypted = await decryptContactsList(privateKey, result);

				this.asymmetricKey = decrypted.keyPair;
				this.symmetricKey = decrypted.symmetricKey;

				emit({ value: decrypted.contactsList });
			},
			(event) => 'ref' in event
		);
	}
}

function submissionToContact(submission: FormSubmission) {
	const arraySubmissions = [...submission.required, ...submission.additional];
	const birthday = arraySubmissions.find((entry) => entry[0].id == 'birthday')?.[1];
	const numbers = arraySubmissions.find((entry) => entry[0].id == 'phone-number')?.[1] ?? [];

	return <Contact>{
		name: arraySubmissions.find((entry) => entry[0].id == 'name')?.[1],
		email: arraySubmissions.find((entry) => entry[0].id == 'email')?.[1],
		phoneNumbers: isSingleValueWithMultipleValuesFormOutput(numbers)
			? numbers.map((x) => <PhoneNumber>{ value: x.input, type: x.type })
			: [],
		birthDate: birthday ? new Date(birthday.toString()) : undefined,
		gender: arraySubmissions.find((entry) => entry[0].id == 'gender')?.[1]
	};
}

async function storeContactsListInManager(
	symmetricKey: SymmetricKey,
	publicKey: AsymmetricKey,
	contacts: ContactsList
) {
	const vault = withVault();

	const encrypted = await vault.symmetricCrypto.encrypt(symmetricKey, JSON.stringify(contacts));

	if (typeof encrypted === 'string') {
		throw 'AES encryption is only supported right now';
	}

	const encryptedList = encrypted.data;
	// maybe move this to encrypt()?
	const iv = String.fromCodePoint(...new Uint8Array(encrypted.iv));

	const symmetricKeyEncrypted = await vault.asymmetricCrypto.encrypt(
		publicKey,
		symmetricKey.toString()
	);

	const encryptedContacts = <EncryptedContactsInfo>{
		key: btoa(symmetricKeyEncrypted),
		// needs to be encrypted
		iv: btoa(iv),
		contacts: btoa(encryptedList)
	};

	return vault.contactsManager.add(btoa(JSON.stringify(encryptedContacts)));
}

async function decryptContactsList(privateKey: AsymmetricKey, encrypted: EncryptedContactsList) {
	const vault = withVault();

	const info = toEncryptedContactsInfo(encrypted);
	const symmetricKey = SymmetricKey.private(
		await vault.asymmetricCrypto.decrypt(privateKey, info.key)
	);
	// needs to be decrypted
	const iv = arrayBuffer(info.iv);

	const contacts = await vault.symmetricCrypto.decrypt(symmetricKey, {
		data: info.contacts,
		iv: iv
	});

	return {
		// todo: we need public key
		keyPair: { private: privateKey, public: privateKey },
		symmetricKey: symmetricKey,
		contactsList: [...JSON.parse(contacts)].map(
			(x) =>
				<Contact>{
					...x,
					birthDate: new Date(x.birthDate)
				}
		)
	};
}

async function triggerStoreContactsList(
	contactsList: ContactsList,
	symmetricKey: SymmetricKey,
	asymmetricKeyPair: AsymmetricKeyPair
) {
	const vault = withVault();
	const result = await storeContactsListInManager(
		symmetricKey,
		asymmetricKeyPair.public,
		contactsList
	);

	await vault.browserStorage.store(
		`${result.ref}/${result.hash}`,
		JSON.stringify(<LocalContactsList>{
			asymmetric: {
				public: asymmetricKeyPair.public.toString(),
				private: asymmetricKeyPair.private.toString()
			},
			symmetric: symmetricKey.toString(),
			contactsList: contactsList
		})
	);
}

function submissionToPublicKey(submission: FormSubmission) {
	const arraySubmissions = [...submission.required, ...submission.additional];
	const asymmetricPublicKey =
		(arraySubmissions.find((entry) => entry[0].id == 'public-key')?.[1] as string) ?? '';

	return AsymmetricKey.public(asymmetricPublicKey);
}

function submissionToPrivateKey(submission: FormSubmission) {
	const arraySubmissions = [...submission.required, ...submission.additional];
	const asymmetricPublicKey =
		(arraySubmissions.find((entry) => entry[0].id == 'private-key')?.[1] as string) ?? '';

	return AsymmetricKey.private(asymmetricPublicKey);
}
