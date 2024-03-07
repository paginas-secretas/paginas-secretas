import type { LocalBrowserStorage } from '@data';

export interface CacheRepository {
	cache(key: string, value: string): Promise<void>;

	lookup(key: string): Promise<string | undefined>;
}

export class LocalStorageCacheRepository implements CacheRepository {
	private readonly storage: LocalBrowserStorage;

	constructor(storage: LocalBrowserStorage) {
		this.storage = storage;
	}

	cache(key: string, value: string): Promise<void> {
		return this.storage.store(key, value);
	}

	lookup(key: string): Promise<string | undefined> {
		return this.storage.lookup(key);
	}
}
