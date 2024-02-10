import { LocalBrowserStorage, type BrowserStorage } from '@data';
import { RSAOAEPAlgorithm, type CryptographicAlgorithm } from '../models';
import { createStore, setInitial, type Store } from './store';

export const ContactsListStore = createContactsListStore(globalThis.window);

type ContactsListState = Array<string>;

function createContactsListStore(window: Window) {
	const cryptoAlgorithm = new RSAOAEPAlgorithm();
	const storage = new LocalBrowserStorage(window);

	const store = createStore<ContactsListState>();
	const subscribe = store.subscribe;

	return {
		subscribe,
		triggerCreateList: () => triggerCreateContactsList(
			store, storage, cryptoAlgorithm,),
	};
}

async function triggerCreateContactsList(
	store: Store<ContactsListState>,
	storage: BrowserStorage<string>,
	cryptoAlgorithm: CryptographicAlgorithm,
) {
	const keyPair = await cryptoAlgorithm.generate();
	console.log('key-pair generated');
	console.log(keyPair);

	// await storage.store('pub', keyPair)

	setInitial(store, []);
}