import type { BaseTranslation } from 'typesafe-i18n';

export type FormTranslation = {
	name: string;
	description: string;
	labels: BaseTranslation;
	descriptions: BaseTranslation;
	placeholders: BaseTranslation;
	values: FormValuesTranslation;
};

export type AlertTranslation = {
	title: string;
	subtitle: string;
	message?: string;
	action: string;
};

export type TabbedAlertTranslation = {
	title: string;
	subtitle: string;
	tabs: { [key: string]: string };
	action: string;
};

export type NotificationTranslation = {
	title: string;
	message: string;
};

type FormValuesTranslation = { [key: string]: string[] };
