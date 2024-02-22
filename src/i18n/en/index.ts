import type { FormTranslation } from '../form';
import type { BaseTranslation } from '../i18n-types';

const en = {
	createList: 'Create contacts list',
	new: 'New',
	saveList: 'Save',
	share: 'Share',
	generateKeyPair: 'Generate keys',
	form: {
		newContact: {
			name: 'Contact Details',
			description: 'Fill in all the required information of the contact',
			labels: {
				name: 'Name',
				email: 'E-mail',
				phoneNumber: 'Phone Number',
				phoneNumberType: 'Phone Number Type',
				gender: 'Gender',
				control: 'Submit',
				birthday: 'Birthday'
			},
			descriptions: {
				name: 'The contact name',
				email: 'The contact e-mail address',
				phoneNumber: 'The contact phone number',
				phoneNumberType: 'The contact phone number type',
				gender: 'Gender',
				birthday: 'The contact birthday'
			},
			placeholders: {
				name: 'Type here',
				email: 'Type here',
				phoneNumber: 'Type here',
				phoneNumberType: 'Select',
				gender: 'Type here',
				birthday: 'Select'
			},
			values: {
				gender: ['Female', 'Male', 'None', 'Other', 'Unknown'],
				phoneNumberType: ['Home', 'Work', 'Mobile', 'Other', 'Voice'],
				address: ['Home', 'Work']
			}
		} satisfies FormTranslation,
		shareContacts: {
			name: 'Share Contacts',
			description: 'Fill in all the required information to be able to share your contacts list',
			labels: {
				publicKey: 'User public (asymmetric) key',
				control: 'Submit'
			},
			descriptions: {
				publicKey: 'The user public (asymmetric) key'
			},
			placeholders: {
				publicKey: 'Type here'
			},
			values: {}
		} satisfies FormTranslation
	},
	contactInformation: {
		personalInformation: 'Personal Information',
		birthday: 'Birthday',
		phoneNumbers: 'Phone Numbers',
		addresses: 'Addresses'
	},
	searchBarPlaceholder: 'Search contact'
} satisfies BaseTranslation;

export default en;
