import type { FormSubmission } from '@components';
import type { AsymmetricKeyPair, ContactsList, SymmetricKey } from '@models';

export type AddContact = FormSubmission;
export type ShareContacts = FormSubmission;
export type DecryptContacts = { ref: string; hash: string; submission: FormSubmission };

export type ImportContactsList = {
	value: {
		symmetricKey: SymmetricKey;
		asymmetricKeyPair: AsymmetricKeyPair;
		contacts: ContactsList;
	};
};

export type NewContactsList = ImportContactsList | Pick<Partial<ImportContactsList>, 'value'>;

export type SaveContacts = {};

export type ContactsEvent =
	| NewContactsList
	| AddContact
	| SaveContacts
	| ShareContacts
	| DecryptContacts;
