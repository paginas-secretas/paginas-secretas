import type { LocalBrowserStorage } from '@data';
import { AsymmetricKey, type AsymmetricKeyPair, SymmetricKey, EncryptionKey } from '@models';

type CryptoStorageKey = 'sym' | 'asy-pair';
type CryptoStorageValue = EncryptionKey[] | AsymmetricKeyPair[];

export interface CryptoCacheRepository {
	cache(key: SymmetricKey | AsymmetricKeyPair): Promise<void>;
	pair(key: AsymmetricKey): Promise<AsymmetricKeyPair | undefined>;
}

export class LocalStorageCryptoCacheRepository implements CryptoCacheRepository {
	private readonly storage: LocalBrowserStorage;
	private readonly maxStoredKeys: number;

	constructor(storage: LocalBrowserStorage) {
		this.storage = storage;
		this.maxStoredKeys = 3;
	}

	async cache(key: SymmetricKey | AsymmetricKeyPair): Promise<void> {
		const storageKey = key instanceof SymmetricKey ? 'sym' : 'asy-pair';
		const cached = await this.lookupAll(storageKey);

		if (cached.length === this.maxStoredKeys) {
			cached.shift();
		}

		cached.push(this.toJSON(key));

		return this.storage.store(storageKey, JSON.stringify(cached));
	}

	async pair(key: AsymmetricKey): Promise<AsymmetricKeyPair | undefined> {
		const lookup = await this.lookupAll('asy-pair');
		const keyJSON = this.toJSON(key);

		const cached = lookup.find(
			(x) =>
				('public' in x && x.public === keyJSON.key) || ('private' in x && x.private === keyJSON.key)
		);

		if (cached) {
			return this.fromJSON([cached])[0] as AsymmetricKeyPair;
		}
	}

	private async lookupAll(key: CryptoStorageKey): Promise<object[]> {
		const lookup = (await this.storage.lookup(key)) ?? '[]';

		return JSON.parse(lookup);
	}

	private fromJSON(json: object[]) {
		const parsed = json.map((x) => {
			if ('public' in x && 'private' in x) {
				return <AsymmetricKeyPair>{
					public: AsymmetricKey.public(atob(`${x.public}`)),
					private: AsymmetricKey.private(atob(`${x.private}`))
				};
			} else if ('key' in x) {
				return SymmetricKey.private(atob(`${x.key}`));
			} else {
				throw new Error(`Invalid JSON: ${JSON.stringify(x)}`);
			}
		});

		return parsed as CryptoStorageValue;
	}

	private toJSON(key: EncryptionKey | AsymmetricKeyPair) {
		if (key instanceof EncryptionKey) {
			return { key: btoa(key.toString()) };
		}

		return {
			public: btoa(key.public.toString()),
			private: btoa(key.private.toString())
		};
	}
}
