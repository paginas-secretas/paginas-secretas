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

export function ContactsInitializationFailed(error: Error) {
	return {
		value: [] as ContactsList,
		error: error,
		type: 'contacts-initialization-failed' as const
	};
}

export function SaveContactsFailed(value: ContactsList, error: Error) {
	return {
		value: value,
		error: error,
		type: 'save-contacts-failed' as const
	};
}

export function ShareContactsFailed(value: ContactsList, error: Error) {
	return {
		value: value,
		error: error,
		type: 'share-contacts-failed' as const
	};
}

export type ContactsUpdated = ReturnType<typeof ContactsUpdated>;
export type ContactsSaved = ReturnType<typeof ContactsSaved>;
export type ContactsShared = ReturnType<typeof ContactsShared>;
export type DecryptContactsFailed = ReturnType<typeof DecryptContactsFailed>;
export type ContactsInitializationFailed = ReturnType<typeof ContactsInitializationFailed>;
export type SaveContactsFailed = ReturnType<typeof SaveContactsFailed>;
export type ShareContactsFailed = ReturnType<typeof ShareContactsFailed>;

export type ContactsState =
	| ContactsUpdated
	| ContactsSaved
	| ContactsShared
	| DecryptContactsFailed
	| ContactsInitializationFailed
	| SaveContactsFailed
	| ShareContactsFailed;

export const isContactsSaved = (state: ContactsState): state is ContactsSaved =>
	isTypedOf<ContactsSaved>(state, 'contacts-saved');

export const isContactsShared = (state: ContactsState): state is ContactsShared =>
	isTypedOf<ContactsShared>(state, 'contacts-shared');

export const isDecryptContactsFailed = (state: ContactsState): state is DecryptContactsFailed =>
	isTypedOf<DecryptContactsFailed>(state, 'decrypt-contacts-failed');

export const isContactsInitializationFailed = (
	state: ContactsState
): state is ContactsInitializationFailed =>
	isTypedOf<ContactsInitializationFailed>(state, 'contacts-initialization-failed');

export const isSaveContactsFailed = (state: ContactsState): state is SaveContactsFailed =>
	isTypedOf<SaveContactsFailed>(state, 'save-contacts-failed');

export const isShareContactsFailed = (state: ContactsState): state is ShareContactsFailed =>
	isTypedOf<ShareContactsFailed>(state, 'share-contacts-failed');