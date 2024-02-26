import { ContactsManager, ContactsManagerClient, type Manager } from '@http';
import { createStore, setSuccess, type Store } from './store';
import {
	AsymmetricKey,
	RSAOAEPAlgorithm,
	type EncryptedContactsList,
	toEncryptedContactsInfo,
	SymmetricKey,
	AESGCMAlgorithm,
	arrayBuffer,
	type ContactsList,
	type Contact,
	type AsymmetricKeyPair
} from '@models';
import type { Form, FormSubmission } from '@components';
import type { TranslationFunctions } from '@i18n';

type LoadSharedContactsListState = {
	encrypted: EncryptedContactsList;
	decrypted?: {
		keyPair: AsymmetricKeyPair;
		symmetricKey: SymmetricKey;
		contactsList: ContactsList;
	};
};

export function createLoadSharedContactsListStore() {
	const store = createStore<LoadSharedContactsListState>();
	const client = new ContactsManagerClient();
	const manager = new ContactsManager(client);
	const subscribe = store.subscribe;

	return {
		subscribe,
		load: (ref: string, hash: string) => triggerFetchContactsList(store, manager, ref, hash),
		decrypt: (submission: FormSubmission) =>
			store.update((state) => {
				triggerDecryptContactsList(store, state.value.encrypted, submission);

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
	manager: Manager,
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
	encrypted: EncryptedContactsList,
	submission: FormSubmission
) {
	const privatePem = [...submission.required].find((e) => e)?.[1] ?? '';
	const privateKey = AsymmetricKey.private(privatePem.toString());
	const algorithm = new RSAOAEPAlgorithm();
	const symmetricAlgorithm = new AESGCMAlgorithm();

	const info = toEncryptedContactsInfo(encrypted);
	const symmetricKey = SymmetricKey.private(await algorithm.decrypt(privateKey, info.key));
	// needs to be decrypted
	const iv = arrayBuffer(info.iv);

	const contacts = await symmetricAlgorithm.decrypt(symmetricKey, {
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
