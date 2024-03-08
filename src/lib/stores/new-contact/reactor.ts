import type { Form, FormSubmission } from '@components';
import { FormReactor, type FormValidation } from '../form';
import type { TranslationFunctions } from '@i18n';
import { logMessage } from '@web-pacotes/lumberdash';

export class NewContactFormReactor extends FormReactor {
	constructor(ll: TranslationFunctions) {
		super(createForm(ll));
	}

	protected validate(form: FormSubmission): Pick<FormValidation, 'required' | 'additional'> {
		logMessage(`validation form... ${form}`);

		return { additional: new Map(), required: new Map() };
	}
}

function createForm(ll: TranslationFunctions): Form {
	const formLL = ll.form.newContact;

	return {
		id: 'new-contact',
		name: formLL.name(),
		description: formLL.description(),
		required: [
			{
				id: 'name',
				description: formLL.descriptions.name(),
				label: formLL.labels.name(),
				placeholder: formLL.placeholders.name(),
				type: 'raw'
			},
			{
				id: 'email',
				description: formLL.descriptions.email(),
				label: formLL.labels.email(),
				placeholder: formLL.placeholders.email(),
				type: 'email'
			}
		],
		additional: [
			{
				id: 'phone-number',
				label: formLL.labels.phoneNumber(),
				count: 1,
				input: {
					id: 'phone-number',
					description: formLL.descriptions.phoneNumber(),
					label: formLL.labels.phoneNumber(),
					placeholder: formLL.placeholders.phoneNumber(),
					type: 'phone-number'
				},
				types: {
					id: 'phone-number-type',
					description: formLL.descriptions.phoneNumberType(),
					label: formLL.labels.phoneNumberType(),
					placeholder: formLL.placeholders.phoneNumberType(),
					type: 'list',
					values: Object.values(formLL.values.phoneNumberType).map((ls) => ls())
				}
			},
			{
				id: 'birthday',
				description: formLL.descriptions.birthday(),
				label: formLL.labels.birthday(),
				placeholder: formLL.placeholders.birthday(),
				type: 'date'
			},
			{
				id: 'gender',
				description: formLL.descriptions.gender(),
				label: formLL.labels.gender(),
				placeholder: formLL.placeholders.gender(),
				type: 'list',
				values: Object.values(formLL.values.gender).map((ls) => ls())
			}
		],
		control: {
			id: 'new-contact-control',
			label: formLL.labels.control(),
			type: 'button'
		}
	};
}
