import type { ContactsList } from '@models';
import { isTypedOf } from '@core';

export function ContactsUpdated(value: ContactsList) {
	return {
		value: value,
		type: 'contacts-updated' as const
	};
}

export function ContactsSaved(value: ContactsList) {
	return {
		value: value,
		type: 'contacts-saved' as const
	};
}

export function ContactsShared(value: ContactsList, url: URL) {
	return {
		value: value,
		url: url,
		type: 'contacts-shared' as const
	};
}

export function DecryptContactsFailed(error: Error) {
	return {
		value: [] as ContactsList,
		error: error,
		type: 'decrypt-contacts-failed' as const
	};
}

export type ContactsUpdated = ReturnType<typeof ContactsUpdated>;
export type ContactsSaved = ReturnType<typeof ContactsSaved>;
export type ContactsShared = ReturnType<typeof ContactsShared>;
export type DecryptContactsFailed = ReturnType<typeof DecryptContactsFailed>;

export type ContactsState =
	| ContactsUpdated
	| ContactsSaved
	| ContactsShared
	| DecryptContactsFailed;

export const isContactsSaved = (state: ContactsState): state is ContactsSaved =>
	isTypedOf<ContactsSaved>(state, 'contacts-saved');

export const isContactsShared = (state: ContactsState): state is ContactsShared =>
	isTypedOf<ContactsShared>(state, 'contacts-shared');

export const isDecryptContactsFailed = (state: ContactsState): state is DecryptContactsFailed =>
	isTypedOf<DecryptContactsFailed>(state, 'decrypt-contacts-failed');
