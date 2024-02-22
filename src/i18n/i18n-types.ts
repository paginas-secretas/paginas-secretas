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
	 * S​h​a​r​e
	 */
	share: string;
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
	 * Share
	 */
	share: () => LocalizedString;
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
};

export type Formatters = {};
