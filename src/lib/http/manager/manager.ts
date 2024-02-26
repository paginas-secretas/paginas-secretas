import type {
	EncryptedContacts,
	EncryptedContactsList,
	PartialEncryptedContactsList
} from '@models';

export interface Manager {
	add(encryptedContacts: EncryptedContacts): Promise<PartialEncryptedContactsList>;
	fetch(ref: string, hash: string): Promise<EncryptedContactsList>;
}
