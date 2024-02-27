import type { Form, FormSubmission } from '@components';
import { withVault } from '@core';
import type { ContactsManager } from '@http';
import type { TranslationFunctions } from '@i18n';
import {
	arrayBuffer,
	AsymmetricCryptographicAlgorithm,
	AsymmetricKey,
	SymmetricCryptographicAlgorithm,
	SymmetricKey,
	toEncryptedContactsInfo,
	type AsymmetricKeyPair,
	type Contact,
	type ContactsList,
	type EncryptedContactsList
} from '@models';
import { createStore, setSuccess, type Store } from './store';

type LoadSharedContactsListState = {
	encrypted: EncryptedContactsList;
	decrypted?: {
		keyPair: AsymmetricKeyPair;
		symmetricKey: SymmetricKey;
		contactsList: ContactsList;
	};
};

export function createLoadSharedContactsListStore() {
	const vault = withVault();

	const store = createStore<LoadSharedContactsListState>();
	const asymmetricCryptoAlgorithm = vault.asymmetricCrypto;
	const symmetricCryptoAlgorithm = vault.symmetricCrypto;
	const manager = vault.contactsManager;
	const subscribe = store.subscribe;

	return {
		subscribe,
		load: (ref: string, hash: string) => triggerFetchContactsList(store, manager, ref, hash),
		decrypt: (submission: FormSubmission) =>
			store.update((state) => {
				triggerDecryptContactsList(
					store,
					asymmetricCryptoAlgorithm,
					symmetricCryptoAlgorithm,
					state.value.encrypted,
					submission
				);

				return state;
			})
	};
}

export function createLoadSharedContactsForm(LL: TranslationFunctions) {
	return {
		id: 'load-shared-contacts',
		name: LL.form.decryptContacts.name(),
		description: LL.form.decryptContacts.description(),
		required: [
			{
				id: 'public-key',
				label: LL.form.decryptContacts.labels.publicKey(),
				description: LL.form.decryptContacts.descriptions.publicKey(),
				placeholder: LL.form.decryptContacts.placeholders.publicKey(),
				type: 'area'
			}
		],
		additional: [],
		control: {
			id: 'submit',
			label: LL.form.decryptContacts.labels.control(),
			type: 'button'
		}
	} satisfies Form;
}

async function triggerFetchContactsList(
	store: Store<LoadSharedContactsListState>,
	manager: ContactsManager,
	ref: string,
	hash: string
) {
	const result = await manager.fetch(ref, hash);

	return setSuccess(store, {
		encrypted: result
	});
}

async function triggerDecryptContactsList(
	store: Store<LoadSharedContactsListState>,
	asymmetricCryptoAlgorithm: AsymmetricCryptographicAlgorithm,
	symmetricCryptoAlgorithm: SymmetricCryptographicAlgorithm,
	encrypted: EncryptedContactsList,
	submission: FormSubmission
) {
	const privatePem = [...submission.required].find((e) => e)?.[1] ?? '';
	const privateKey = AsymmetricKey.private(privatePem.toString());

	const info = toEncryptedContactsInfo(encrypted);
	const symmetricKey = SymmetricKey.private(
		await asymmetricCryptoAlgorithm.decrypt(privateKey, info.key)
	);
	// needs to be decrypted
	const iv = arrayBuffer(info.iv);

	const contacts = await symmetricCryptoAlgorithm.decrypt(symmetricKey, {
		data: info.contacts,
		iv: iv
	});

	// hack
	return setSuccess(store, {
		encrypted: encrypted,
		decrypted: {
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
		}
	});
}
