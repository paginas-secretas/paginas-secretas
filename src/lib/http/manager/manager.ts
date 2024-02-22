import type { EncryptedContacts, PartialEncryptedContactsList } from '@models';

export interface Manager {
	add(encryptedContacts: EncryptedContacts): Promise<PartialEncryptedContactsList>;
}
