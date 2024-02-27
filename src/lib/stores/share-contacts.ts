import type { Form, FormSubmission } from '@components';
import { withVault } from '@core';
import type { ContactsManager } from '@http';
import type { TranslationFunctions } from '@i18n';
import {
	AsymmetricCryptographicAlgorithm,
	AsymmetricKey,
	type AESGCMEncryptResult,
	type ContactsList,
	type EncryptedContactsInfo,
	type SymmetricCryptographicAlgorithm
} from '@models';
import { State, from } from './state';
import { createStore, type Store } from './store';

type ShareContactsState = {
	form: Form;
	url?: URL;
};

function createShareContactsForm(ll: TranslationFunctions) {
	const formLL = ll.form.shareContacts;

	return {
		form: {
			id: 'share-contacts',
			name: formLL.name(),
			description: formLL.description(),
			required: [
				{
					id: 'public-key',
					description: formLL.descriptions.publicKey(),
					label: formLL.labels.publicKey(),
					placeholder: formLL.placeholders.publicKey(),
					type: 'area'
				}
			],
			additional: [],
			control: {
				id: 'share-contacts-control',
				label: formLL.labels.control(),
				type: 'button'
			}
		} satisfies Form
	};
}

export function createShareContactsStore(ll: TranslationFunctions) {
	const vault = withVault();

	const form = createShareContactsForm(ll);
	const store = createStore<ShareContactsState>(form);
	const symmetricCryptoAlgorithm = vault.symmetricCrypto;
	const asymmetricCryptoAlgorithm = vault.asymmetricCrypto;
	const manager = vault.contactsManager;
	const subscribe = store.subscribe;

	return {
		subscribe,
		submit: (submission: FormSubmission, contactsList: ContactsList) =>
			triggerShareContacts(
				store,
				symmetricCryptoAlgorithm,
				asymmetricCryptoAlgorithm,
				manager,
				submission,
				contactsList
			)
	};
}

async function triggerShareContacts(
	store: Store<ShareContactsState>,
	symmetricCryptoAlgorithm: SymmetricCryptographicAlgorithm,
	asymmetricCryptoAlgorithm: AsymmetricCryptographicAlgorithm,
	manager: ContactsManager,
	submission: FormSubmission,
	contactsList: ContactsList
) {
	const symmetricKey = await symmetricCryptoAlgorithm.generate();
	const encrypted = await symmetricCryptoAlgorithm.encrypt(
		symmetricKey,
		JSON.stringify(contactsList)
	);

	let encryptedList: string;
	let iv = '';
	if (typeof encrypted !== 'string') {
		const aesgcmEncryptResult: AESGCMEncryptResult = encrypted as AESGCMEncryptResult;
		encryptedList = aesgcmEncryptResult.data;
		iv = String.fromCodePoint(...new Uint8Array(aesgcmEncryptResult.iv));
	} else {
		encryptedList = encrypted as string;
	}

	const arraySubmissions = [...submission.required, ...submission.additional];
	const asymmetricPublicKey =
		(arraySubmissions.find((entry) => entry[0].id == 'public-key')?.[1] as string) ?? '';

	const asymmetricPublicKeyArrayBuffer = importPemKey(asymmetricPublicKey);

	const symmetricKeyEncrypted = await asymmetricCryptoAlgorithm.encrypt(
		AsymmetricKey.public(asymmetricPublicKeyArrayBuffer),
		symmetricKey.toString()
	);

	const encryptedListBase64 = btoa(encryptedList);

	const encryptedContacts = <EncryptedContactsInfo>{
		key: btoa(symmetricKeyEncrypted),
		iv: btoa(iv),
		contacts: encryptedListBase64
	};

	const result = await manager.add(btoa(JSON.stringify(encryptedContacts)));
	const url = new URL(`${window.location.origin}/${result.ref}/${result.hash}`);

	return store.update((state) => {
		state.value.url = url;

		return from(state.value, State.success);
	});
}

function importPemKey(pem: string): ArrayBufferLike {
	const b64 = pem.replaceAll(/(-----([A-Z ]{14,21})-----)|\n/g, '');
	const byteStr = atob(b64);
	const bytes = new Uint8Array(byteStr.length);
	for (let i = 0; i < byteStr.length; i++) {
		bytes[i] = byteStr.charCodeAt(i);
	}
	return bytes.buffer;
}
