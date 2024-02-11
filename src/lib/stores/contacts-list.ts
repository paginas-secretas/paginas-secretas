import { LocalBrowserStorage, type BrowserStorage } from '@data';
import {
	RSAOAEPAlgorithm,
	type CryptographicAlgorithm,
	type ContactsList,
	type AsymmetricKeyPair
} from '../models';
import { createStore, setSuccess, type Store } from './store';

export const ContactsListStore = createContactsListStore(globalThis.window);

type ContactsListState = {
	keyPair: AsymmetricKeyPair;
	value: ContactsList;
};

function createContactsListStore(window: Window) {
	const cryptoAlgorithm = new RSAOAEPAlgorithm();
	const storage = new LocalBrowserStorage(window);

	const store = createStore<ContactsListState>();
	const subscribe = store.subscribe;

	return {
		subscribe,
		triggerCreateList: () => triggerCreateContactsList(store, storage, cryptoAlgorithm)
	};
}

async function triggerCreateContactsList(
	store: Store<ContactsListState>,
	storage: BrowserStorage<string>,
	cryptoAlgorithm: CryptographicAlgorithm
) {
	const keyPair = await cryptoAlgorithm.generate();
	console.log('key-pair generated');

	setSuccess(store, {
		keyPair: keyPair,
		value: []
	});
}
