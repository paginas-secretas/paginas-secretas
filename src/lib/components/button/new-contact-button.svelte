<script lang="ts">
	import { LL } from '@i18n';
	import { ModalForm, type Form } from '../form';
	import type { LocalizedString } from 'typesafe-i18n';

	export let onClick: () => void;

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
				type: 'raw',
				possibleValues: []
			},
			{
				id: 'email',
				description: $LL.form.newContact.descriptions.email(),
				label: $LL.form.newContact.labels.email(),
				placeholder: $LL.form.newContact.placeholders.email(),
				type: 'email',
				possibleValues: []
			}
		],
		additional: [
			{
				id: 'phone-number',
				description: $LL.form.newContact.descriptions.phoneNumber(),
				label: $LL.form.newContact.labels.phoneNumber(),
				placeholder: $LL.form.newContact.placeholders.phoneNumber(),
				type: 'phone-number',
				possibleValues: []
			},
			{
				id: 'gender',
				description: $LL.form.newContact.descriptions.gender(),
				label: $LL.form.newContact.labels.gender(),
				placeholder: $LL.form.newContact.placeholders.gender(),
				type: 'list',
				possibleValues: Object.keys($LL.form.newContact.values.gender).map((key) =>
					($LL.form.newContact.values.gender as { [key: string]: () => LocalizedString })[key]()
				)
			}
		],
		control: {
			id: 'new-contact-control',
			label: 'Add Contact',
			type: 'button'
		}
	};
</script>

<article>
	<label class="btn btn-primary" on:click={onClick} for={form.id}>{$LL.new()}</label>
	<ModalForm {form} />
</article>
