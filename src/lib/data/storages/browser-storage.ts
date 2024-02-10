export interface BrowserStorage<T> {
	store(key: string, value: T): Promise<void>;
	lookup(key: string): Promise<T | undefined>;
}
