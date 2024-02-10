import type { BrowserStorage } from './browser-storage';

export class LocalBrowserStorage implements BrowserStorage<string> {
	private window: Window;

	constructor(window: Window) {
		this.window = window;
	}

	store(key: string, value: string): Promise<void> {
		return Promise.resolve(this.window.localStorage.setItem(key, value));
	}

	lookup(key: string): Promise<string | undefined> {
		const value = this.window.localStorage.getItem(key);

		return Promise.resolve(value ?? undefined);
	}
}
