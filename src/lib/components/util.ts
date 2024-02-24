import { tick } from 'svelte';

/**
 * Executes a callback after the next time DOM update (aka next tick)
 *
 * @param callback - the callback to execute
 * @returns a promise of the task that will be execute on the next update
 */
export function onNextTick(callback: () => void) {
	return tick().finally(callback);
}

export function isValidURL(value: string): boolean {
	try {
		new URL(value);
		return true;
	} catch (err) {
		return false;
	}
}
