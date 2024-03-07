import {
	type BrowserStorage,
	LocalBrowserStorage,
	type CryptoCacheRepository,
	LocalStorageCryptoCacheRepository
} from '@data';
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
	cryptoCache: CryptoCacheRepository;
	contactsManager: ContactsManager;
	asymmetricCrypto: AsymmetricCryptographicAlgorithm;
	symmetricCrypto: SymmetricCryptographicAlgorithm;
};

export function registerVault(window: Window) {
	if (!globalVault) {
		const browserStorage = new LocalBrowserStorage(window);

		globalVault = <VaultAccessor>{
			browserStorage: browserStorage,
			contactsManager: new WorkerContactsManager(new ContactsManagerClient()),
			asymmetricCrypto: new RSAOAEPAlgorithm(),
			symmetricCrypto: new AESGCMAlgorithm(),
			cryptoCache: new LocalStorageCryptoCacheRepository(browserStorage)
		};
	}
}

export function withVault() {
	return globalVault;
}
