<script lang="ts">
	import { LL } from '@i18n';
	import { ModalForm, type Form, type FormInput } from '../form';

	const form = <Form>{
		id: 'new-contact',
		name: $LL.form.newContact.name(),
		description: $LL.form.newContact.description(),
		required: [
			{
				id: 'name',
				description: $LL.form.newContact.descriptions.name(),
				label: $LL.form.newContact.labels.name(),
				placeholder: $LL.form.newContact.placeholders.name(),
				type: 'raw'
			},
			{
				id: 'email',
				description: $LL.form.newContact.descriptions.email(),
				label: $LL.form.newContact.labels.email(),
				placeholder: $LL.form.newContact.placeholders.email(),
				type: 'email'
			}
		] satisfies FormInput[],
		additional: [
			{
				id: 'phone-number',
				description: $LL.form.newContact.descriptions.phoneNumber(),
				label: $LL.form.newContact.labels.phoneNumber(),
				placeholder: $LL.form.newContact.placeholders.phoneNumber(),
				type: 'phone-number'
			},
			{
				id: 'gender',
				description: $LL.form.newContact.descriptions.gender(),
				label: $LL.form.newContact.labels.gender(),
				placeholder: $LL.form.newContact.placeholders.gender(),
				type: 'list',
				values: Object.values($LL.form.newContact.values.gender).map((ls) => ls())
			}
		] satisfies FormInput[],
		control: {
			id: 'new-contact-control',
			label: $LL.form.newContact.labels.control(),
			type: 'button'
		}
	};
</script>

<article>
	<label class="btn btn-primary" for={form.id}>{$LL.new()}</label>
	<ModalForm {form} />
</article>
