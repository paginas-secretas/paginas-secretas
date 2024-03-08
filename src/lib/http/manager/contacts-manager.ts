import type {
	EncryptedContacts,
	EncryptedContactsList,
	PartialEncryptedContactsList
} from '@models';
import { contactsEndpoint, ContactsManagerClient, type ContactsManager } from '@http';
import { logError } from '@web-pacotes/lumberdash';
import { wrapError } from '@core';

export class WorkerContactsManager implements ContactsManager {
	constructor(private readonly client: ContactsManagerClient) {}

	async add(encryptedContacts: EncryptedContacts): Promise<PartialEncryptedContactsList> {
		try {
			const encryptedContactsList = <EncryptedContactsList>{
				contacts: encryptedContacts
			};
			const response = await this.client.add(
				contactsEndpoint,
				JSON.stringify(encryptedContactsList)
			);

			return response.status == 200 ? response.json() : Promise.resolve(response.status);
		} catch (err) {
			logError(wrapError(err));

			throw 'Could not upload encrypted contacts list';
		}
	}

	async fetch(ref: string, hash: string): Promise<EncryptedContactsList> {
		try {
			const response = await this.client.get(
				`${contactsEndpoint}/${ref}`,
				new Headers({
					'x-doc-hash': hash
				})
			);

			return response.status == 200 ? response.json() : Promise.resolve(response.status);
		} catch (err) {
			logError(wrapError(err));

			throw 'Could not fetch encrypted contacts list';
		}
	}
}
