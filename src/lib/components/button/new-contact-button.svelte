<script lang="ts">
	import { LL } from '@i18n';
	import { ModalForm, type Form } from '../form';

	export let onClick: () => void;

	const form = <Form>{
		id: 'new-contact',
		name: 'Contact Details',
		description: 'Fill in all the required information of the contact',
		required: [
			{
				id: 'name',
				description: 'The contact name',
				label: 'Name',
				placeholder: 'Type here',
				type: 'raw'
			},
			{
				id: 'email',
				description: 'The contact e-mail address',
				label: 'E-mail',
				placeholder: 'Type here',
				type: 'email'
			}
		],
		additional: [
			{
				id: 'phone-number',
				description: 'The contact phone-number',
				label: 'Phone Number',
				placeholder: 'Type here',
				type: 'phone-number'
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
