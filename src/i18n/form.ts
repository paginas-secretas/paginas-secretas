import type { BaseTranslation } from 'typesafe-i18n';

export type FormTranslation = {
	name: string;
	description: string;
	labels: BaseTranslation;
	descriptions: BaseTranslation;
	placeholders: BaseTranslation;
	values: FormValuesTranslation;
};

type FormValuesTranslation = { [key: string]: string[] };
