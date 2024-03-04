import { type BrowserStorage, LocalBrowserStorage } from '@data';
import { type ContactsManager, ContactsManagerClient, WorkerContactsManager } from '@http';
import {
	AESGCMAlgorithm,
	type AsymmetricCryptographicAlgorithm,
	RSAOAEPAlgorithm,
	type SymmetricCryptographicAlgorithm
} from '@models';
import type { NotificationsReactor } from '@stores';

let globalVault: VaultAccessor;

type VaultAccessor = {
	browserStorage: BrowserStorage<string>;
	contactsManager: ContactsManager;
	asymmetricCrypto: AsymmetricCryptographicAlgorithm;
	symmetricCrypto: SymmetricCryptographicAlgorithm;
	notificationsReactor: NotificationsReactor;
};

export function registerVault(window: Window, notificationsReactor: NotificationsReactor) {
	globalVault = <VaultAccessor>{
		browserStorage: new LocalBrowserStorage(window),
		contactsManager: new WorkerContactsManager(new ContactsManagerClient()),
		asymmetricCrypto: new RSAOAEPAlgorithm(),
		symmetricCrypto: new AESGCMAlgorithm(),
		notificationsReactor: notificationsReactor
	};
}

export function withVault() {
	return globalVault;
}
