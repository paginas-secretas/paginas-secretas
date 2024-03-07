import {
	type FormSubmission,
	isSingleValueWithMultipleValuesFormOutput,
	wrapError
} from '@components';
import { Reactor, withVault } from '@core';
import {
	AsymmetricKey,
	type AsymmetricKeyPair,
	type Contact,
	type ContactsList,
	type EncryptedContactsInfo,
	type EncryptedContactsList,
	type LocalContactsList,
	type PhoneNumber,
	SymmetricKey,
	toEncryptedContactsInfo
} from '@models';
import {
	type AddContact,
	type ContactsEvent,
	type DecryptContacts,
	type ImportContacts,
	isAddContact,
	isDecryptContacts,
	isImportContacts,
	isNewContactsList,
	isSaveContacts,
	isShareContacts,
	type NewContactsList,
	type SaveContacts,
	type ShareContacts
} from './event';
import {
	ContactsInitializationFailed,
	ContactsSaved,
	ContactsShared,
	type ContactsState,
	ContactsUpdated,
	DecryptContactsFailed,
	SaveContactsFailed,
	ShareContactsFailed,
	ContactsDecrypted
} from './state';

export class ContactsReactor extends Reactor<ContactsEvent, ContactsState> {
	private symmetricKey!: SymmetricKey;
	private asymmetricKey!: AsymmetricKeyPair;

	constructor() {
		super(ContactsUpdated([]));

		super.on<AddContact>((event, emit) => {
			const contact = submissionToContact(event.submission);

			emit(ContactsUpdated([...this.state.value, contact]));
		}, isAddContact);

		super.on<NewContactsList>(async (_, emit) => {
			try {
				const vault = withVault();

				this.asymmetricKey = await vault.asymmetricCrypto.generate();
				this.symmetricKey = await vault.symmetricCrypto.generate();

				emit(ContactsUpdated(this.state.value));
			} catch (error) {
				emit(ContactsInitializationFailed(wrapError(error)));
			}
		}, isNewContactsList);

		super.on<ImportContacts>(async (event, emit) => {
			this.asymmetricKey = event.asymmetricKeyPair;
			this.symmetricKey = event.symmetricKey;

			emit(ContactsUpdated(event.contacts));
		}, isImportContacts);

		super.on<SaveContacts>(async (_, emit) => {
			try {
				await triggerStoreContactsList(this.state.value, this.symmetricKey, this.asymmetricKey);

				emit(ContactsSaved(this.state.value));
			} catch (error) {
				emit(SaveContactsFailed(this.state.value, wrapError(error)));
			}
		}, isSaveContacts);

		super.on<ShareContacts>(async (event, emit) => {
			try {
				const vault = withVault();

				const publicKey = submissionToPublicKey(event.submission);
				const symmetricKey = await vault.symmetricCrypto.generate();
				const result = await storeContactsListInManager(symmetricKey, publicKey, this.state.value);

				emit(
					ContactsShared(
						this.state.value,
						new URL(`${window.location.origin}/${result.ref}/${result.hash}`)
					)
				);
			} catch (error) {
				emit(ShareContactsFailed(this.state.value, wrapError(error)));
			}
		}, isShareContacts);

		super.on<DecryptContacts>(async (event, emit) => {
			const vault = withVault();

			try {
				const privateKey = submissionToPrivateKey(event.submission);
				const result = await vault.contactsManager.fetch(event.ref, event.hash);
				const decrypted = await decryptContactsList(privateKey, result);

				this.asymmetricKey = decrypted.keyPair;
				this.symmetricKey = decrypted.symmetricKey;

				emit(
					ContactsDecrypted(
						decrypted.contactsList,
						this.asymmetricKey.private == this.asymmetricKey.public
					)
				);
			} catch (error) {
				emit(DecryptContactsFailed(error instanceof Error ? error : new Error(`${error}`)));
			}
		}, isDecryptContacts);
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
			? numbers
					.filter((x) => !!x.input && x.input.trim().length > 0 && !!x.type)
					.map((x) => <PhoneNumber>{ value: x.input, type: x.type })
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

	const ivEncrypted = await vault.asymmetricCrypto.encrypt(publicKey, encrypted.iv);

	const symmetricKeyEncrypted = await vault.asymmetricCrypto.encrypt(
		publicKey,
		symmetricKey.toString()
	);

	const encryptedContacts = <EncryptedContactsInfo>{
		key: btoa(symmetricKeyEncrypted),
		iv: btoa(ivEncrypted),
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

	const iv = await vault.asymmetricCrypto.decrypt(privateKey, info.iv);
	const contacts = await vault.symmetricCrypto.decrypt(symmetricKey, {
		data: info.contacts,
		iv: iv
	});

	const keyPair = await vault.cryptoCache.pair(privateKey);

	return {
		keyPair: keyPair ? keyPair : { private: privateKey, public: privateKey },
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
