import type { Form, FormSubmission } from '@components';
import { FormReactor, type FormValidation } from '../form';
import type { TranslationFunctions } from '@i18n';
import { logMessage } from '@web-pacotes/lumberdash';

export class ShareContactsFormReactor extends FormReactor {
	constructor(ll: TranslationFunctions) {
		super(createForm(ll));
	}

	protected validate(form: FormSubmission): Pick<FormValidation, 'required' | 'additional'> {
		logMessage(`validation form... ${form}`);

		return { additional: new Map(), required: new Map() };
	}
}

function createForm(ll: TranslationFunctions): Form {
	const formLL = ll.form.shareContacts;

	return {
		id: 'share-contacts',
		name: formLL.name(),
		description: formLL.description(),
		required: [
			{
				id: 'public-key',
				description: formLL.descriptions.publicKey(),
				label: formLL.labels.publicKey(),
				placeholder: formLL.placeholders.publicKey(),
				type: 'area'
			}
		],
		additional: [],
		control: {
			id: 'share-contacts-control',
			label: formLL.labels.control(),
			type: 'button'
		}
	};
}
