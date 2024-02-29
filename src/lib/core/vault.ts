import { LocalBrowserStorage, type BrowserStorage } from '@data';
import { ContactsManagerClient, WorkerContactsManager, type ContactsManager } from '@http';
import {
	AESGCMAlgorithm,
	RSAOAEPAlgorithm,
	type AsymmetricCryptographicAlgorithm,
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
	const accessor = <VaultAccessor>{
		browserStorage: new LocalBrowserStorage(window),
		contactsManager: new WorkerContactsManager(new ContactsManagerClient()),
		asymmetricCrypto: new RSAOAEPAlgorithm(),
		symmetricCrypto: new AESGCMAlgorithm()
	};

	globalVault = accessor;
}

export function withVault() {
	return globalVault;
}
