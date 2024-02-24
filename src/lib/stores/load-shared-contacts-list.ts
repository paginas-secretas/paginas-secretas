import { ContactsManager, ContactsManagerClient, type Manager } from '@http';
import { createStore, setSuccess, type Store } from './store';
import {
	AsymmetricKey,
	RSAOAEPAlgorithm,
	type EncryptedContactsList,
	toEncryptedContactsInfo,
	SymmetricKey
} from '@models';
import type { FormSubmission } from '@components';
import { State, from } from './state';

type LoadSharedContactsListState = {
	encrypted: EncryptedContactsList;
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

	const info = toEncryptedContactsInfo(encrypted);
	console.log(JSON.stringify(info));
	const symmetricKey = SymmetricKey.private(await algorithm.decrypt(privateKey, info.key));
}
