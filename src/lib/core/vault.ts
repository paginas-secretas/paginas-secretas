import { type BrowserStorage, LocalBrowserStorage } from '@data';
import { type ContactsManager, ContactsManagerClient, WorkerContactsManager } from '@http';
import {
	AESGCMAlgorithm,
	type AsymmetricCryptographicAlgorithm,
	RSAOAEPAlgorithm,
	type SymmetricCryptographicAlgorithm
} from '@models';

let globalVault: VaultAccessor;

type VaultAccessor = {
	browserStorage: BrowserStorage<string>;
	contactsManager: ContactsManager;
	asymmetricCrypto: AsymmetricCryptographicAlgorithm;
	symmetricCrypto: SymmetricCryptographicAlgorithm;
};

export function registerVault(window: Window) {
	globalVault = <VaultAccessor>{
		browserStorage: new LocalBrowserStorage(window),
		contactsManager: new WorkerContactsManager(new ContactsManagerClient()),
		asymmetricCrypto: new RSAOAEPAlgorithm(),
		symmetricCrypto: new AESGCMAlgorithm()
	};
}

export function withVault() {
	return globalVault;
}
