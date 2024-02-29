import type { ContactsList } from '@models';

export type InitialContacts = {
	value: ContactsList;
};

export type ContactsSaved = InitialContacts & { url: URL };

export type ContactsState = InitialContacts | ContactsSaved;
