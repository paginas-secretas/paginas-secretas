import type {
	AlertTranslation,
	FormTranslation,
	NotificationTranslation,
	TabbedAlertTranslation
} from '../types';
import type { BaseTranslation } from '@i18n';

const en = {
	createList: 'Create contacts list',
	new: 'New',
	saveList: 'Save',
	addPublicKey: 'Provide Public Key',
	share: 'Share',
	generateKeyPair: 'Generate keys',
	states: {
		emptyContactList: "You haven't added a contact record yet.",
		encryptedContacts: 'You need a private key to load this contacts list.',
		mobileLayoutNotSupported: "I'm sorry, this application isn't available on mobile yet."
	},
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
		} satisfies FormTranslation,
		decryptContacts: {
			name: 'Decrypt Contacts',
			description: 'Fill in all the required information to be able to load your contacts list',
			labels: {
				publicKey: 'User private (asymmetric) key',
				control: 'Submit'
			},
			descriptions: {
				publicKey: 'The private (asymmetric) key able to decrypt the contacts list'
			},
			placeholders: {
				publicKey: 'Type here'
			},
			values: {}
		} satisfies FormTranslation,
		importPublicKey: {
			name: 'Import Public Key',
			description:
				'Fill in all the required information to be able to import your contacts list public key',
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
	alert: {
		generateKeyPair: {
			title: 'Key Pair',
			subtitle:
				"Here's your newly generated key pair. Only share the public key with the contacts list owner.",
			tabs: {
				public: 'Public',
				private: 'Private'
			},
			action: 'Confirm'
		} satisfies TabbedAlertTranslation,
		sharedContactsList: {
			title: 'Shared Contacts List',
			subtitle:
				"Here's the URL for accessing the shared contacts list. Share it with the public key owner.",
			action: 'Confirm'
		} satisfies AlertTranslation,
		generatePublicKeyFailure: {
			title: 'Generation Failure',
			subtitle: 'An unexpected error has occurred when generating your public key.',
			action: 'Confirm'
		} satisfies AlertTranslation,
		initializationFailure: {
			title: 'Initialization Failure',
			subtitle: 'An unexpected error occurred while initializing the contacts list',
			action: 'Confirm'
		} satisfies AlertTranslation
	},
	notification: {
		decryptFailed: {
			title: 'Invalid Key',
			message: "The provided key couldn't be used to decrypt the contacts list."
		} satisfies NotificationTranslation,
		saveFailed: {
			title: 'Contacts Save',
			message: 'An error has occurred while saving the contacts list. Please try again.'
		} satisfies NotificationTranslation,
		shareFailed: {
			title: 'Contacts Share',
			message: 'An error has occurred while sharing the contacts list. Please try again.'
		} satisfies NotificationTranslation,
		missingPublicKey: {
			title: 'Missing Public Key',
			message: 'The contacts list will remain readonly until the public key is provided.'
		} satisfies NotificationTranslation,
		importPublicKeyFailed: {
			title: 'Import Public Key',
			message: 'The provided public key does not match the private key.'
		} satisfies NotificationTranslation
	},
	contactInformation: {
		personalInformation: 'Personal Information',
		birthday: 'Birthday',
		phoneNumbers: 'Phone Numbers',
		addresses: 'Addresses'
	},
	searchBarPlaceholder: 'Search contact',
	copyAction: 'Copy to clipboard',
	copiedAction: 'Copied!',
	downloadAction: 'Download',
	downloadedAction: 'Downloaded!'
} satisfies BaseTranslation;

export default en;
