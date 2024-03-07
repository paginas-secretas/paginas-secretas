import type { FormSubmission } from '@components';
import type { AsymmetricKeyPair, ContactsList, SymmetricKey } from '@models';
import { isTypedOf } from '@core';

export function AddContact(submission: FormSubmission) {
	return {
		type: 'add-contact' as const,
		submission: submission
	};
}

export function ShareContacts(submission: FormSubmission) {
	return {
		type: 'share-contacts' as const,
		submission: submission
	};
}

export function ImportPublicKey(submission: FormSubmission) {
	return {
		type: 'import-public-key' as const,
		submission: submission
	};
}

export function DecryptContacts(ref: string, hash: string, submission: FormSubmission) {
	return {
		type: 'decrypt-contacts' as const,
		submission: submission,
		ref: ref,
		hash: hash
	};
}

export function ImportContacts(
	symmetricKey: SymmetricKey,
	asymmetricKeyPair: AsymmetricKeyPair,
	contacts: ContactsList
) {
	return {
		symmetricKey: symmetricKey,
		asymmetricKeyPair: asymmetricKeyPair,
		contacts: contacts,
		type: 'import-contacts' as const
	};
}

export function NewContactsList() {
	return {
		type: 'new-contacts-list' as const
	};
}

export function SaveContacts() {
	return {
		type: 'save-contacts' as const
	};
}

export type AddContact = ReturnType<typeof AddContact>;
export type ShareContacts = ReturnType<typeof ShareContacts>;
export type DecryptContacts = ReturnType<typeof DecryptContacts>;
export type ImportContacts = ReturnType<typeof ImportContacts>;
export type ImportPublicKey = ReturnType<typeof ImportPublicKey>;
export type NewContactsList = ReturnType<typeof NewContactsList>;
export type SaveContacts = ReturnType<typeof SaveContacts>;

export type ContactsEvent =
	| NewContactsList
	| AddContact
	| SaveContacts
	| ShareContacts
	| ImportContacts
	| ImportPublicKey
	| DecryptContacts;

export const isNewContactsList = (event: ContactsEvent) =>
	isTypedOf<NewContactsList>(event, 'new-contacts-list');
export const isAddContact = (event: ContactsEvent) => isTypedOf<AddContact>(event, 'add-contact');
export const isSaveContacts = (event: ContactsEvent) =>
	isTypedOf<SaveContacts>(event, 'save-contacts');
export const isShareContacts = (event: ContactsEvent) =>
	isTypedOf<ShareContacts>(event, 'share-contacts');
export const isImportContacts = (event: ContactsEvent) =>
	isTypedOf<ImportContacts>(event, 'import-contacts');
export const isImportPublicKey = (event: ContactsEvent) =>
	isTypedOf<ImportPublicKey>(event, 'import-public-key');
export const isDecryptContacts = (event: ContactsEvent) =>
	isTypedOf<DecryptContacts>(event, 'decrypt-contacts');
