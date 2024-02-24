import type {
	EncryptedContacts,
	EncryptedContactsList,
	PartialEncryptedContactsList
} from '@models';
import { contactsEndpoint, type Client, type Manager } from '@http';

export class ContactsManager implements Manager {
	constructor(private readonly client: Client) {}

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
			console.error(err);
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
			console.error(err);
			throw 'Could not fetch encrypted contacts list';
		}
	}
}
