import { Client } from '.';

const env = import.meta.env;
const baseUrl = new URL(env.VITE_CONTACTS_MANAGER_URL);

export const contactsEndpoint = '/contacts';
export const docHashHeader = 'x-doc-hash';

export class ContactsManagerClient extends Client {
	constructor() {
		super(baseUrl);
	}
}
