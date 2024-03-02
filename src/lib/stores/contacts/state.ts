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

export type ContactsUpdated = ReturnType<typeof ContactsUpdated>;
export type ContactsSaved = ReturnType<typeof ContactsSaved>;
export type ContactsShared = ReturnType<typeof ContactsShared>;

export type ContactsState = ContactsUpdated | ContactsSaved | ContactsShared;

export const isContactsSaved = (state: ContactsState): state is ContactsSaved =>
	isTypedOf<ContactsSaved>(state, 'contacts-saved');

export const isContactsShared = (state: ContactsState): state is ContactsShared =>
	isTypedOf<ContactsShared>(state, 'contacts-shared');
