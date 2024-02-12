export type ContactsList = Array<Contact>;

export interface Contact {
	name: string;
	email: string;
	phoneNumber: PhoneNumber;
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
