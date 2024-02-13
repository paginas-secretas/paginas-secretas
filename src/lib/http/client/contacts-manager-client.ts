import { Client } from '.';

const env = import.meta.env;
const baseUrl = new URL(env.VITE_CONTACTS_MANAGER_URL);
export const contactsEndpoint = env.VITE_CONTACTS_MANAGER_CONTACTS_ENDPOINT;

export const docHashHeader = 'x-doc-hash';

export class ContactsManagerClient extends Client {
	constructor() {
		super(baseUrl);
	}
}
