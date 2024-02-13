import { Client } from '.';

// TODO
const baseUrl = new URL("http://localhost:8787/");
export const contactsEndpoint = "contacts";

export const docHashHeader = 'x-doc-hash';

export class ContactsManagerClient extends Client {
	constructor() {
		super(baseUrl);
	}
}
