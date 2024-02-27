import { LocalBrowserStorage, type BrowserStorage } from '@data';
import { ContactsManagerClient, type ContactsManager, WorkerContactsManager } from '@http';
import {
	RSAOAEPAlgorithm,
	type AsymmetricCryptographicAlgorithm,
	type SymmetricCryptographicAlgorithm,
	AESGCMAlgorithm
} from '@models';
import { getContext, setContext } from 'svelte';

type VaultAccessor = {
	browserStorage: BrowserStorage<string>;
	contactsManager: ContactsManager;
	asymmetricCrypto: AsymmetricCryptographicAlgorithm;
	symmetricCrypto: SymmetricCryptographicAlgorithm;
};

export function registerVault(window: Window) {
	const accessor = <VaultAccessor>{
		browserStorage: new LocalBrowserStorage(window),
		contactsManager: new WorkerContactsManager(new ContactsManagerClient()),
		asymmetricCrypto: new RSAOAEPAlgorithm(),
		symmetricCrypto: new AESGCMAlgorithm()
	};

	return setContext<VaultAccessor>('vault', accessor);
}

export function withVault() {
	return getContext<VaultAccessor>('vault');
}
