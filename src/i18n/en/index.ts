import type { FormTranslation } from '../form';
import type { BaseTranslation } from '../i18n-types';

const en = {
	createList: 'Create contacts list',
	new: 'New',
	form: {
		newContact: {
			name: 'Contact Details',
			description: 'Fill in all the required information of the contact',
			labels: {
				name: 'Name',
				email: 'E-mail',
				phoneNumber: 'Phone Number',
				gender: 'Gender',
				control: 'Submit'
			},
			descriptions: {
				name: 'The contact name',
				email: 'The contact e-mail address',
				phoneNumber: 'The contact phone number',
				gender: 'Gender'
			},
			placeholders: {
				name: 'Type here',
				email: 'Type here',
				phoneNumber: 'Type here',
				gender: 'Type here'
			},
			values: {
				gender: ['Female', 'Male', 'None', 'Other', 'Unknown']
			}
		} satisfies FormTranslation
	}
} satisfies BaseTranslation;

export default en;
