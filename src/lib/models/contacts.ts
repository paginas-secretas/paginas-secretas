export type ContactsList = Array<Contact>;

export interface Contact {
	name: string;
	email: string;
	phoneNumbers: PhoneNumber[];
	gender: string;
	birthDate: Date | undefined;
}

export interface Address {
	type: string;
	street: string;
	location: string;
	region: number;
	country: string;
	postalCode: string;
}

export interface PhoneNumber {
	type: string;
	value: string;
}

export type EncryptedContacts = string;
export type DocumentReference = string;
export type DocumentHash = string;

export interface EncryptedContactsInfo {
	key: string;
	iv: string;
	contacts: EncryptedContacts;
}

export interface EncryptedContactsList {
	contacts: EncryptedContacts;
}

export interface PartialEncryptedContactsList {
	ref: DocumentReference;
	hash: DocumentHash;
}

export interface LocalContactsList {
	asymmetric: {
		public: string;
		private: string;
	};
	symmetric: string;
	contactsList: ContactsList;
}
