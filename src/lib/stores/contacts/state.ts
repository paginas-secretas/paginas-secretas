import type { ContactsList } from '@models';
import { isTypedOf } from '@core';

export function ContactsLoaded(value: ContactsList) {
	return {
		value: value,
		readonly: false,
		type: 'contacts-loaded' as const
	};
}

export function ContactsUpdated(value: ContactsList) {
	return {
		value: value,
		readonly: false,
		type: 'contacts-updated' as const
	};
}

export function ContactsSaved(value: ContactsList) {
	return {
		value: value,
		readonly: false,
		type: 'contacts-saved' as const
	};
}

export function ContactsShared(value: ContactsList, url: URL) {
	return {
		value: value,
		url: url,
		readonly: false,
		type: 'contacts-shared' as const
	};
}

export function ContactsDecrypted(value: ContactsList, isMissingPublicKey: boolean) {
	return {
		value: value,
		isMissingPublicKey: isMissingPublicKey,
		readonly: isMissingPublicKey,
		type: 'contacts-decrypted' as const
	};
}

export function DecryptContactsFailed(error: Error) {
	return {
		value: [] as ContactsList,
		error: error,
		readonly: false,
		type: 'decrypt-contacts-failed' as const
	};
}

export function ContactsInitializationFailed(error: Error) {
	return {
		value: [] as ContactsList,
		error: error,
		readonly: false,
		type: 'contacts-initialization-failed' as const
	};
}

export function SaveContactsFailed(value: ContactsList, error: Error) {
	return {
		value: value,
		error: error,
		readonly: false,
		type: 'save-contacts-failed' as const
	};
}

export function ShareContactsFailed(value: ContactsList, error: Error) {
	return {
		value: value,
		error: error,
		readonly: false,
		type: 'share-contacts-failed' as const
	};
}

export function ImportPublicKeyFailed(value: ContactsList) {
	return {
		value: value,
		readonly: true,
		type: 'import-public-key-failed' as const
	};
}

export type ContactsLoaded = ReturnType<typeof ContactsLoaded>;
export type ContactsUpdated = ReturnType<typeof ContactsUpdated>;
export type ContactsSaved = ReturnType<typeof ContactsSaved>;
export type ContactsShared = ReturnType<typeof ContactsShared>;
export type ContactsDecrypted = ReturnType<typeof ContactsDecrypted>;
export type DecryptContactsFailed = ReturnType<typeof DecryptContactsFailed>;
export type ContactsInitializationFailed = ReturnType<typeof ContactsInitializationFailed>;
export type SaveContactsFailed = ReturnType<typeof SaveContactsFailed>;
export type ShareContactsFailed = ReturnType<typeof ShareContactsFailed>;
export type ImportPublicKeyFailed = ReturnType<typeof ImportPublicKeyFailed>;

export type ContactsState =
	| ContactsLoaded
	| ContactsUpdated
	| ContactsSaved
	| ContactsShared
	| ContactsDecrypted
	| DecryptContactsFailed
	| ContactsInitializationFailed
	| SaveContactsFailed
	| ShareContactsFailed
	| ImportPublicKeyFailed;

export const isContactsLoaded = (state: ContactsState): state is ContactsLoaded =>
	isTypedOf<ContactsLoaded>(state, 'contacts-loaded');

export const isContactsSaved = (state: ContactsState): state is ContactsSaved =>
	isTypedOf<ContactsSaved>(state, 'contacts-saved');

export const isContactsShared = (state: ContactsState): state is ContactsShared =>
	isTypedOf<ContactsShared>(state, 'contacts-shared');

export const isContactsDecrypted = (state: ContactsState): state is ContactsDecrypted =>
	isTypedOf<ContactsDecrypted>(state, 'contacts-decrypted');

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

export const isImportPublicKeyFailed = (state: ContactsState): state is ImportPublicKeyFailed =>
	isTypedOf<ImportPublicKeyFailed>(state, 'import-public-key-failed');
