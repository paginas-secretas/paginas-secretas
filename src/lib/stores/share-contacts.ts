import type { Form, FormSubmission } from '@components';
import { createStore, type Store } from './store';
import type { TranslationFunctions } from '@i18n';
import {
	AESGCMAlgorithm,
	AsymmetricCryptographicAlgorithm,
	type AESGCMEncryptResult,
	type ContactsList,
	type SymmetricCryptographicAlgorithm,
	RSAOAEPAlgorithm,
	AsymmetricKey,
	type EncryptedContactsInfo
} from '@models';
import { ContactsManager, ContactsManagerClient, type Manager } from '@http';

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
				type: 'area'
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
	const symmetricCryptoAlgorithm = new AESGCMAlgorithm();
	const asymmetricCryptoAlgorithm = new RSAOAEPAlgorithm();
	const client = new ContactsManagerClient();
	const manager = new ContactsManager(client);
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
	manager: Manager,
	submission: FormSubmission,
	contactsList: ContactsList
) {
	console.log('triggerShareContacts');

	const symmetricKey = await symmetricCryptoAlgorithm.generate();
	const encrypted = await symmetricCryptoAlgorithm.encrypt(
		symmetricKey,
		JSON.stringify(contactsList)
	);
	console.log(`symmetricKey ${symmetricKey.toString()}`);

	let encryptedList: string;
	let iv = '';
	if (typeof encrypted !== 'string') {
		const aesgcmEncryptResult: AESGCMEncryptResult = encrypted as AESGCMEncryptResult;
		encryptedList = aesgcmEncryptResult.data;
		iv = String.fromCodePoint(...new Uint8Array(aesgcmEncryptResult.iv));
		console.log(`iv${iv}`);
	} else {
		encryptedList = encrypted as string;
	}

	const arraySubmissions = [...submission.required, ...submission.additional];
	const asymmetricPublicKey =
		(arraySubmissions.find((entry) => entry[0].id == 'public-key')?.[1] as string) ?? '';

	console.log(`asymmetricPublicKey ${asymmetricPublicKey}`);
	const asymmetricPublicKeyArrayBuffer = importPemKey(asymmetricPublicKey);
	console.log(`asymmetricPublicKeyUint8Array ${asymmetricPublicKeyArrayBuffer}`);

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

	manager.add(btoa(JSON.stringify(encryptedContacts)));
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
