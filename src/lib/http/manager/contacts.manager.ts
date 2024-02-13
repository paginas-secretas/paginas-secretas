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
			const response = await this.client.add(contactsEndpoint, JSON.stringify(encryptedContactsList));

			return response.status == 200 ? response.json() : Promise.resolve(response.status);
		} catch (err) {
			console.error(err);
			throw 'Could not upload encrypted contacts list';
		}
	}
}
