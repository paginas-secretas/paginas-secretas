import { RSAOAEPAlgorithm, type CryptographicAlgorithm } from '../models';
import { createStore, type Store } from './store';

export const ContactsListStore = createContactsListStore();

type ContactsListState = 'TODO';

function createContactsListStore() {
	const cryptoAlgorithm = new RSAOAEPAlgorithm();

	const store = createStore<ContactsListState>();
	const subscribe = store.subscribe;

	return {
		subscribe,
		triggerCreateList: () => triggerCreateContactsList(cryptoAlgorithm, store)
	};
}

async function triggerCreateContactsList(
	cryptoAlgorithm: CryptographicAlgorithm,
	store: Store<ContactsListState>
) {
	const keyPair = await cryptoAlgorithm.generate();
	console.log('key-pair generated');
	console.log(keyPair);
	store.update('');
}
