import type { Form, FormSubmission } from '@components';
import { FormReactor, type FormValidation } from '../form';
import type { TranslationFunctions } from '@i18n';
import { logMessage } from '@web-pacotes/lumberdash';

export class ImportContactsFormReactor extends FormReactor {
	constructor(ll: TranslationFunctions) {
		super(createForm(ll));
	}

	protected validate(form: FormSubmission): Pick<FormValidation, 'required' | 'additional'> {
		logMessage(`validation form... ${form}`);

		return { additional: new Map(), required: new Map() };
	}
}

function createForm(ll: TranslationFunctions): Form {
	const formLL = ll.form.decryptContacts;

	return {
		id: 'import-contacts',
		name: formLL.name(),
		description: formLL.description(),
		required: [
			{
				id: 'private-key',
				label: formLL.labels.publicKey(),
				description: formLL.descriptions.publicKey(),
				placeholder: formLL.placeholders.publicKey(),
				type: 'area'
			}
		],
		additional: [],
		control: {
			id: 'submit',
			label: formLL.labels.control(),
			type: 'button'
		}
	};
}
