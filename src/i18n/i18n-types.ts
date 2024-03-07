// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString } from 'typesafe-i18n';

export type BaseTranslation = BaseTranslationType;
export type BaseLocale = 'en';

export type Locales = 'en' | 'pt';

export type Translation = RootTranslation;

export type Translations = RootTranslation;

type RootTranslation = {
	/**
	 * C​r​e​a​t​e​ ​c​o​n​t​a​c​t​s​ ​l​i​s​t
	 */
	createList: string;
	/**
	 * N​e​w
	 */
	new: string;
	/**
	 * S​a​v​e
	 */
	saveList: string;
	/**
	 * P​r​o​v​i​d​e​ ​P​u​b​l​i​c​ ​K​e​y
	 */
	addPublicKey: string;
	/**
	 * S​h​a​r​e
	 */
	share: string;
	/**
	 * G​e​n​e​r​a​t​e​ ​k​e​y​s
	 */
	generateKeyPair: string;
	states: {
		/**
		 * Y​o​u​ ​h​a​v​e​n​'​t​ ​a​d​d​e​d​ ​a​ ​c​o​n​t​a​c​t​ ​r​e​c​o​r​d​ ​y​e​t​.
		 */
		emptyContactList: string;
		/**
		 * Y​o​u​ ​n​e​e​d​ ​a​ ​p​r​i​v​a​t​e​ ​k​e​y​ ​t​o​ ​l​o​a​d​ ​t​h​i​s​ ​c​o​n​t​a​c​t​s​ ​l​i​s​t​.
		 */
		encryptedContacts: string;
	};
	form: {
		newContact: {
			/**
			 * C​o​n​t​a​c​t​ ​D​e​t​a​i​l​s
			 */
			name: string;
			/**
			 * F​i​l​l​ ​i​n​ ​a​l​l​ ​t​h​e​ ​r​e​q​u​i​r​e​d​ ​i​n​f​o​r​m​a​t​i​o​n​ ​o​f​ ​t​h​e​ ​c​o​n​t​a​c​t
			 */
			description: string;
			labels: {
				/**
				 * N​a​m​e
				 */
				name: string;
				/**
				 * E​-​m​a​i​l
				 */
				email: string;
				/**
				 * P​h​o​n​e​ ​N​u​m​b​e​r
				 */
				phoneNumber: string;
				/**
				 * P​h​o​n​e​ ​N​u​m​b​e​r​ ​T​y​p​e
				 */
				phoneNumberType: string;
				/**
				 * G​e​n​d​e​r
				 */
				gender: string;
				/**
				 * S​u​b​m​i​t
				 */
				control: string;
				/**
				 * B​i​r​t​h​d​a​y
				 */
				birthday: string;
			};
			descriptions: {
				/**
				 * T​h​e​ ​c​o​n​t​a​c​t​ ​n​a​m​e
				 */
				name: string;
				/**
				 * T​h​e​ ​c​o​n​t​a​c​t​ ​e​-​m​a​i​l​ ​a​d​d​r​e​s​s
				 */
				email: string;
				/**
				 * T​h​e​ ​c​o​n​t​a​c​t​ ​p​h​o​n​e​ ​n​u​m​b​e​r
				 */
				phoneNumber: string;
				/**
				 * T​h​e​ ​c​o​n​t​a​c​t​ ​p​h​o​n​e​ ​n​u​m​b​e​r​ ​t​y​p​e
				 */
				phoneNumberType: string;
				/**
				 * G​e​n​d​e​r
				 */
				gender: string;
				/**
				 * T​h​e​ ​c​o​n​t​a​c​t​ ​b​i​r​t​h​d​a​y
				 */
				birthday: string;
			};
			placeholders: {
				/**
				 * T​y​p​e​ ​h​e​r​e
				 */
				name: string;
				/**
				 * T​y​p​e​ ​h​e​r​e
				 */
				email: string;
				/**
				 * T​y​p​e​ ​h​e​r​e
				 */
				phoneNumber: string;
				/**
				 * S​e​l​e​c​t
				 */
				phoneNumberType: string;
				/**
				 * T​y​p​e​ ​h​e​r​e
				 */
				gender: string;
				/**
				 * S​e​l​e​c​t
				 */
				birthday: string;
			};
			values: {
				gender: {
					/**
					 * F​e​m​a​l​e
					 */
					'0': string;
					/**
					 * M​a​l​e
					 */
					'1': string;
					/**
					 * N​o​n​e
					 */
					'2': string;
					/**
					 * O​t​h​e​r
					 */
					'3': string;
					/**
					 * U​n​k​n​o​w​n
					 */
					'4': string;
				};
				phoneNumberType: {
					/**
					 * H​o​m​e
					 */
					'0': string;
					/**
					 * W​o​r​k
					 */
					'1': string;
					/**
					 * M​o​b​i​l​e
					 */
					'2': string;
					/**
					 * O​t​h​e​r
					 */
					'3': string;
					/**
					 * V​o​i​c​e
					 */
					'4': string;
				};
				address: {
					/**
					 * H​o​m​e
					 */
					'0': string;
					/**
					 * W​o​r​k
					 */
					'1': string;
				};
			};
		};
		shareContacts: {
			/**
			 * S​h​a​r​e​ ​C​o​n​t​a​c​t​s
			 */
			name: string;
			/**
			 * F​i​l​l​ ​i​n​ ​a​l​l​ ​t​h​e​ ​r​e​q​u​i​r​e​d​ ​i​n​f​o​r​m​a​t​i​o​n​ ​t​o​ ​b​e​ ​a​b​l​e​ ​t​o​ ​s​h​a​r​e​ ​y​o​u​r​ ​c​o​n​t​a​c​t​s​ ​l​i​s​t
			 */
			description: string;
			labels: {
				/**
				 * U​s​e​r​ ​p​u​b​l​i​c​ ​(​a​s​y​m​m​e​t​r​i​c​)​ ​k​e​y
				 */
				publicKey: string;
				/**
				 * S​u​b​m​i​t
				 */
				control: string;
			};
			descriptions: {
				/**
				 * T​h​e​ ​u​s​e​r​ ​p​u​b​l​i​c​ ​(​a​s​y​m​m​e​t​r​i​c​)​ ​k​e​y
				 */
				publicKey: string;
			};
			placeholders: {
				/**
				 * T​y​p​e​ ​h​e​r​e
				 */
				publicKey: string;
			};
			values: {};
		};
		decryptContacts: {
			/**
			 * D​e​c​r​y​p​t​ ​C​o​n​t​a​c​t​s
			 */
			name: string;
			/**
			 * F​i​l​l​ ​i​n​ ​a​l​l​ ​t​h​e​ ​r​e​q​u​i​r​e​d​ ​i​n​f​o​r​m​a​t​i​o​n​ ​t​o​ ​b​e​ ​a​b​l​e​ ​t​o​ ​l​o​a​d​ ​y​o​u​r​ ​c​o​n​t​a​c​t​s​ ​l​i​s​t
			 */
			description: string;
			labels: {
				/**
				 * U​s​e​r​ ​p​r​i​v​a​t​e​ ​(​a​s​y​m​m​e​t​r​i​c​)​ ​k​e​y
				 */
				publicKey: string;
				/**
				 * S​u​b​m​i​t
				 */
				control: string;
			};
			descriptions: {
				/**
				 * T​h​e​ ​p​r​i​v​a​t​e​ ​(​a​s​y​m​m​e​t​r​i​c​)​ ​k​e​y​ ​a​b​l​e​ ​t​o​ ​d​e​c​r​y​p​t​ ​t​h​e​ ​c​o​n​t​a​c​t​s​ ​l​i​s​t
				 */
				publicKey: string;
			};
			placeholders: {
				/**
				 * T​y​p​e​ ​h​e​r​e
				 */
				publicKey: string;
			};
			values: {};
		};
		importPublicKey: {
			/**
			 * I​m​p​o​r​t​ ​P​u​b​l​i​c​ ​K​e​y
			 */
			name: string;
			/**
			 * F​i​l​l​ ​i​n​ ​a​l​l​ ​t​h​e​ ​r​e​q​u​i​r​e​d​ ​i​n​f​o​r​m​a​t​i​o​n​ ​t​o​ ​b​e​ ​a​b​l​e​ ​t​o​ ​i​m​p​o​r​t​ ​y​o​u​r​ ​c​o​n​t​a​c​t​s​ ​l​i​s​t​ ​p​u​b​l​i​c​ ​k​e​y
			 */
			description: string;
			labels: {
				/**
				 * U​s​e​r​ ​p​u​b​l​i​c​ ​(​a​s​y​m​m​e​t​r​i​c​)​ ​k​e​y
				 */
				publicKey: string;
				/**
				 * S​u​b​m​i​t
				 */
				control: string;
			};
			descriptions: {
				/**
				 * T​h​e​ ​u​s​e​r​ ​p​u​b​l​i​c​ ​(​a​s​y​m​m​e​t​r​i​c​)​ ​k​e​y
				 */
				publicKey: string;
			};
			placeholders: {
				/**
				 * T​y​p​e​ ​h​e​r​e
				 */
				publicKey: string;
			};
			values: {};
		};
	};
	alert: {
		generateKeyPair: {
			/**
			 * K​e​y​ ​P​a​i​r
			 */
			title: string;
			/**
			 * H​e​r​e​'​s​ ​y​o​u​r​ ​n​e​w​l​y​ ​g​e​n​e​r​a​t​e​d​ ​k​e​y​ ​p​a​i​r​.​ ​O​n​l​y​ ​s​h​a​r​e​ ​t​h​e​ ​p​u​b​l​i​c​ ​k​e​y​ ​w​i​t​h​ ​t​h​e​ ​c​o​n​t​a​c​t​s​ ​l​i​s​t​ ​o​w​n​e​r​.
			 */
			subtitle: string;
			tabs: {
				/**
				 * P​u​b​l​i​c
				 */
				public: string;
				/**
				 * P​r​i​v​a​t​e
				 */
				private: string;
			};
			/**
			 * C​o​n​f​i​r​m
			 */
			action: string;
		};
		sharedContactsList: {
			/**
			 * S​h​a​r​e​d​ ​C​o​n​t​a​c​t​s​ ​L​i​s​t
			 */
			title: string;
			/**
			 * H​e​r​e​'​s​ ​t​h​e​ ​U​R​L​ ​f​o​r​ ​a​c​c​e​s​s​i​n​g​ ​t​h​e​ ​s​h​a​r​e​d​ ​c​o​n​t​a​c​t​s​ ​l​i​s​t​.​ ​S​h​a​r​e​ ​i​t​ ​w​i​t​h​ ​t​h​e​ ​p​u​b​l​i​c​ ​k​e​y​ ​o​w​n​e​r​.
			 */
			subtitle: string;
			/**
			 * C​o​n​f​i​r​m
			 */
			action: string;
		};
		generatePublicKeyFailure: {
			/**
			 * G​e​n​e​r​a​t​i​o​n​ ​F​a​i​l​u​r​e
			 */
			title: string;
			/**
			 * A​n​ ​u​n​e​x​p​e​c​t​e​d​ ​e​r​r​o​r​ ​h​a​s​ ​o​c​c​u​r​r​e​d​ ​w​h​e​n​ ​g​e​n​e​r​a​t​i​n​g​ ​y​o​u​r​ ​p​u​b​l​i​c​ ​k​e​y​.
			 */
			subtitle: string;
			/**
			 * C​o​n​f​i​r​m
			 */
			action: string;
		};
		initializationFailure: {
			/**
			 * I​n​i​t​i​a​l​i​z​a​t​i​o​n​ ​F​a​i​l​u​r​e
			 */
			title: string;
			/**
			 * A​n​ ​u​n​e​x​p​e​c​t​e​d​ ​e​r​r​o​r​ ​o​c​c​u​r​r​e​d​ ​w​h​i​l​e​ ​i​n​i​t​i​a​l​i​z​i​n​g​ ​t​h​e​ ​c​o​n​t​a​c​t​s​ ​l​i​s​t
			 */
			subtitle: string;
			/**
			 * C​o​n​f​i​r​m
			 */
			action: string;
		};
	};
	notification: {
		decryptFailed: {
			/**
			 * I​n​v​a​l​i​d​ ​K​e​y
			 */
			title: string;
			/**
			 * T​h​e​ ​p​r​o​v​i​d​e​d​ ​k​e​y​ ​c​o​u​l​d​n​'​t​ ​b​e​ ​u​s​e​d​ ​t​o​ ​d​e​c​r​y​p​t​ ​t​h​e​ ​c​o​n​t​a​c​t​s​ ​l​i​s​t​.
			 */
			message: string;
		};
		saveFailed: {
			/**
			 * C​o​n​t​a​c​t​s​ ​S​a​v​e
			 */
			title: string;
			/**
			 * A​n​ ​e​r​r​o​r​ ​h​a​s​ ​o​c​c​u​r​r​e​d​ ​w​h​i​l​e​ ​s​a​v​i​n​g​ ​t​h​e​ ​c​o​n​t​a​c​t​s​ ​l​i​s​t​.​ ​P​l​e​a​s​e​ ​t​r​y​ ​a​g​a​i​n​.
			 */
			message: string;
		};
		shareFailed: {
			/**
			 * C​o​n​t​a​c​t​s​ ​S​h​a​r​e
			 */
			title: string;
			/**
			 * A​n​ ​e​r​r​o​r​ ​h​a​s​ ​o​c​c​u​r​r​e​d​ ​w​h​i​l​e​ ​s​h​a​r​i​n​g​ ​t​h​e​ ​c​o​n​t​a​c​t​s​ ​l​i​s​t​.​ ​P​l​e​a​s​e​ ​t​r​y​ ​a​g​a​i​n​.
			 */
			message: string;
		};
		missingPublicKey: {
			/**
			 * M​i​s​s​i​n​g​ ​P​u​b​l​i​c​ ​K​e​y
			 */
			title: string;
			/**
			 * T​h​e​ ​c​o​n​t​a​c​t​s​ ​l​i​s​t​ ​w​i​l​l​ ​r​e​m​a​i​n​ ​r​e​a​d​o​n​l​y​ ​u​n​t​i​l​ ​t​h​e​ ​p​u​b​l​i​c​ ​k​e​y​ ​i​s​ ​p​r​o​v​i​d​e​d​.
			 */
			message: string;
		};
		importPublicKeyFailed: {
			/**
			 * I​m​p​o​r​t​ ​P​u​b​l​i​c​ ​K​e​y
			 */
			title: string;
			/**
			 * T​h​e​ ​p​r​o​v​i​d​e​d​ ​p​u​b​l​i​c​ ​k​e​y​ ​d​o​e​s​ ​n​o​t​ ​m​a​t​c​h​ ​t​h​e​ ​p​r​i​v​a​t​e​ ​k​e​y​.
			 */
			message: string;
		};
	};
	contactInformation: {
		/**
		 * P​e​r​s​o​n​a​l​ ​I​n​f​o​r​m​a​t​i​o​n
		 */
		personalInformation: string;
		/**
		 * B​i​r​t​h​d​a​y
		 */
		birthday: string;
		/**
		 * P​h​o​n​e​ ​N​u​m​b​e​r​s
		 */
		phoneNumbers: string;
		/**
		 * A​d​d​r​e​s​s​e​s
		 */
		addresses: string;
	};
	/**
	 * S​e​a​r​c​h​ ​c​o​n​t​a​c​t
	 */
	searchBarPlaceholder: string;
	/**
	 * C​o​p​y​ ​t​o​ ​c​l​i​p​b​o​a​r​d
	 */
	copyAction: string;
	/**
	 * C​o​p​i​e​d​!
	 */
	copiedAction: string;
	/**
	 * D​o​w​n​l​o​a​d
	 */
	downloadAction: string;
	/**
	 * D​o​w​n​l​o​a​d​e​d​!
	 */
	downloadedAction: string;
};

export type TranslationFunctions = {
	/**
	 * Create contacts list
	 */
	createList: () => LocalizedString;
	/**
	 * New
	 */
	new: () => LocalizedString;
	/**
	 * Save
	 */
	saveList: () => LocalizedString;
	/**
	 * Provide Public Key
	 */
	addPublicKey: () => LocalizedString;
	/**
	 * Share
	 */
	share: () => LocalizedString;
	/**
	 * Generate keys
	 */
	generateKeyPair: () => LocalizedString;
	states: {
		/**
		 * You haven't added a contact record yet.
		 */
		emptyContactList: () => LocalizedString;
		/**
		 * You need a private key to load this contacts list.
		 */
		encryptedContacts: () => LocalizedString;
	};
	form: {
		newContact: {
			/**
			 * Contact Details
			 */
			name: () => LocalizedString;
			/**
			 * Fill in all the required information of the contact
			 */
			description: () => LocalizedString;
			labels: {
				/**
				 * Name
				 */
				name: () => LocalizedString;
				/**
				 * E-mail
				 */
				email: () => LocalizedString;
				/**
				 * Phone Number
				 */
				phoneNumber: () => LocalizedString;
				/**
				 * Phone Number Type
				 */
				phoneNumberType: () => LocalizedString;
				/**
				 * Gender
				 */
				gender: () => LocalizedString;
				/**
				 * Submit
				 */
				control: () => LocalizedString;
				/**
				 * Birthday
				 */
				birthday: () => LocalizedString;
			};
			descriptions: {
				/**
				 * The contact name
				 */
				name: () => LocalizedString;
				/**
				 * The contact e-mail address
				 */
				email: () => LocalizedString;
				/**
				 * The contact phone number
				 */
				phoneNumber: () => LocalizedString;
				/**
				 * The contact phone number type
				 */
				phoneNumberType: () => LocalizedString;
				/**
				 * Gender
				 */
				gender: () => LocalizedString;
				/**
				 * The contact birthday
				 */
				birthday: () => LocalizedString;
			};
			placeholders: {
				/**
				 * Type here
				 */
				name: () => LocalizedString;
				/**
				 * Type here
				 */
				email: () => LocalizedString;
				/**
				 * Type here
				 */
				phoneNumber: () => LocalizedString;
				/**
				 * Select
				 */
				phoneNumberType: () => LocalizedString;
				/**
				 * Type here
				 */
				gender: () => LocalizedString;
				/**
				 * Select
				 */
				birthday: () => LocalizedString;
			};
			values: {
				gender: {
					/**
					 * Female
					 */
					'0': () => LocalizedString;
					/**
					 * Male
					 */
					'1': () => LocalizedString;
					/**
					 * None
					 */
					'2': () => LocalizedString;
					/**
					 * Other
					 */
					'3': () => LocalizedString;
					/**
					 * Unknown
					 */
					'4': () => LocalizedString;
				};
				phoneNumberType: {
					/**
					 * Home
					 */
					'0': () => LocalizedString;
					/**
					 * Work
					 */
					'1': () => LocalizedString;
					/**
					 * Mobile
					 */
					'2': () => LocalizedString;
					/**
					 * Other
					 */
					'3': () => LocalizedString;
					/**
					 * Voice
					 */
					'4': () => LocalizedString;
				};
				address: {
					/**
					 * Home
					 */
					'0': () => LocalizedString;
					/**
					 * Work
					 */
					'1': () => LocalizedString;
				};
			};
		};
		shareContacts: {
			/**
			 * Share Contacts
			 */
			name: () => LocalizedString;
			/**
			 * Fill in all the required information to be able to share your contacts list
			 */
			description: () => LocalizedString;
			labels: {
				/**
				 * User public (asymmetric) key
				 */
				publicKey: () => LocalizedString;
				/**
				 * Submit
				 */
				control: () => LocalizedString;
			};
			descriptions: {
				/**
				 * The user public (asymmetric) key
				 */
				publicKey: () => LocalizedString;
			};
			placeholders: {
				/**
				 * Type here
				 */
				publicKey: () => LocalizedString;
			};
			values: {};
		};
		decryptContacts: {
			/**
			 * Decrypt Contacts
			 */
			name: () => LocalizedString;
			/**
			 * Fill in all the required information to be able to load your contacts list
			 */
			description: () => LocalizedString;
			labels: {
				/**
				 * User private (asymmetric) key
				 */
				publicKey: () => LocalizedString;
				/**
				 * Submit
				 */
				control: () => LocalizedString;
			};
			descriptions: {
				/**
				 * The private (asymmetric) key able to decrypt the contacts list
				 */
				publicKey: () => LocalizedString;
			};
			placeholders: {
				/**
				 * Type here
				 */
				publicKey: () => LocalizedString;
			};
			values: {};
		};
		importPublicKey: {
			/**
			 * Import Public Key
			 */
			name: () => LocalizedString;
			/**
			 * Fill in all the required information to be able to import your contacts list public key
			 */
			description: () => LocalizedString;
			labels: {
				/**
				 * User public (asymmetric) key
				 */
				publicKey: () => LocalizedString;
				/**
				 * Submit
				 */
				control: () => LocalizedString;
			};
			descriptions: {
				/**
				 * The user public (asymmetric) key
				 */
				publicKey: () => LocalizedString;
			};
			placeholders: {
				/**
				 * Type here
				 */
				publicKey: () => LocalizedString;
			};
			values: {};
		};
	};
	alert: {
		generateKeyPair: {
			/**
			 * Key Pair
			 */
			title: () => LocalizedString;
			/**
			 * Here's your newly generated key pair. Only share the public key with the contacts list owner.
			 */
			subtitle: () => LocalizedString;
			tabs: {
				/**
				 * Public
				 */
				public: () => LocalizedString;
				/**
				 * Private
				 */
				private: () => LocalizedString;
			};
			/**
			 * Confirm
			 */
			action: () => LocalizedString;
		};
		sharedContactsList: {
			/**
			 * Shared Contacts List
			 */
			title: () => LocalizedString;
			/**
			 * Here's the URL for accessing the shared contacts list. Share it with the public key owner.
			 */
			subtitle: () => LocalizedString;
			/**
			 * Confirm
			 */
			action: () => LocalizedString;
		};
		generatePublicKeyFailure: {
			/**
			 * Generation Failure
			 */
			title: () => LocalizedString;
			/**
			 * An unexpected error has occurred when generating your public key.
			 */
			subtitle: () => LocalizedString;
			/**
			 * Confirm
			 */
			action: () => LocalizedString;
		};
		initializationFailure: {
			/**
			 * Initialization Failure
			 */
			title: () => LocalizedString;
			/**
			 * An unexpected error occurred while initializing the contacts list
			 */
			subtitle: () => LocalizedString;
			/**
			 * Confirm
			 */
			action: () => LocalizedString;
		};
	};
	notification: {
		decryptFailed: {
			/**
			 * Invalid Key
			 */
			title: () => LocalizedString;
			/**
			 * The provided key couldn't be used to decrypt the contacts list.
			 */
			message: () => LocalizedString;
		};
		saveFailed: {
			/**
			 * Contacts Save
			 */
			title: () => LocalizedString;
			/**
			 * An error has occurred while saving the contacts list. Please try again.
			 */
			message: () => LocalizedString;
		};
		shareFailed: {
			/**
			 * Contacts Share
			 */
			title: () => LocalizedString;
			/**
			 * An error has occurred while sharing the contacts list. Please try again.
			 */
			message: () => LocalizedString;
		};
		missingPublicKey: {
			/**
			 * Missing Public Key
			 */
			title: () => LocalizedString;
			/**
			 * The contacts list will remain readonly until the public key is provided.
			 */
			message: () => LocalizedString;
		};
		importPublicKeyFailed: {
			/**
			 * Import Public Key
			 */
			title: () => LocalizedString;
			/**
			 * The provided public key does not match the private key.
			 */
			message: () => LocalizedString;
		};
	};
	contactInformation: {
		/**
		 * Personal Information
		 */
		personalInformation: () => LocalizedString;
		/**
		 * Birthday
		 */
		birthday: () => LocalizedString;
		/**
		 * Phone Numbers
		 */
		phoneNumbers: () => LocalizedString;
		/**
		 * Addresses
		 */
		addresses: () => LocalizedString;
	};
	/**
	 * Search contact
	 */
	searchBarPlaceholder: () => LocalizedString;
	/**
	 * Copy to clipboard
	 */
	copyAction: () => LocalizedString;
	/**
	 * Copied!
	 */
	copiedAction: () => LocalizedString;
	/**
	 * Download
	 */
	downloadAction: () => LocalizedString;
	/**
	 * Downloaded!
	 */
	downloadedAction: () => LocalizedString;
};

export type Formatters = {};
